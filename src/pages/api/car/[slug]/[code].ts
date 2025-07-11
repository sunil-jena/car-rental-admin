/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug, code } = req.query;


    if (req.method === 'PUT') {
        try {
            const {
                title,
                description,
                price,
                location,
                year,
                make,
                model,
                mileage,
                fuelType,
                transmission,
                imageUrl,
                updatedBy,
                adminId,
            } = req.body;

            // Fetch existing car
            const existingCar = await prisma.carListing.findFirst({
                where: { slug: slug as string, code: code as string },
            });

            if (!existingCar) {
                return res.status(404).json({ error: 'Car not found' });
            }

            // Build changes detail log
            const changes: string[] = [];
            const updatedFields: Record<string, any> = {
                title,
                description,
                price,
                location,
                year,
                make,
                model,
                mileage,
                fuelType,
                transmission,
                imageUrl,
            };

            Object.keys(updatedFields).forEach((key) => {
                if (updatedFields[key] !== (existingCar as any)[key]) {
                    changes.push(
                        `${key}: "${(existingCar as any)[key]}" → "${updatedFields[key]}"`
                    );
                }
            });

            // Update car
            const updatedCar = await prisma.carListing.update({
                where: { id: existingCar.id },
                data: {
                    ...updatedFields,
                    lastModified: new Date(),
                    submittedBy: updatedBy || existingCar.submittedBy,
                },
            });

            // Create audit log entry only if changes occurred
            if (changes.length > 0) {
                await prisma.auditLogEntry.create({
                    data: {
                        listingId: existingCar.id,
                        adminId: adminId, // ensure adminId is passed from frontend
                        action: 'edited',
                        details: `Updated fields:\n${changes.join('\n')}`,
                        timestamp: new Date(),
                    },
                });
            }

            res.status(200).json(updatedCar);
        } catch (error) {
            console.error('[UPDATE_CAR]', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
