import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ error: "Missing id or status" });
    }

    try {
        const updatedCar = await prisma.carListing.update({
            where: { id },
            data: {
                status,
                lastModified: new Date(),
            },
        });

        return res.status(200).json({
            message: `Car status updated to ${status} successfully.`,
            car: updatedCar,
        });
    } catch (error) {
        console.error("Error updating car status:", error);
        return res.status(500).json({ error: "Failed to update car status." });
    }
}
