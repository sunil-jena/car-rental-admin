/* eslint-disable @typescript-eslint/no-explicit-any */
import AuditLog from '@/components/audit/AuditLog';
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Head from 'next/head';

export default function AuditLogPage({ auditEntries, total, page, limit, totalPages, statusData, pageSizeOptions }: any) {
    return (
        <>
            <Head>
                <title>Audit Logs | Car Rental</title>
                <meta
                    name="description"
                    content="View all audit logs and admin activities for the car rental management dashboard."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>

            <AuditLog
                auditEntries={auditEntries}
                total={total}
                page={page}
                limit={limit}
                totalPages={totalPages}
                statusData={statusData}
                pageSizeOptions={pageSizeOptions}
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const page = Number(context.query.page) || 1;
    const limit = Number(context.query.limit) || 10;

    const [total, logsRaw] = await Promise.all([
        prisma.auditLogEntry.count(),
        prisma.auditLogEntry.findMany({
            orderBy: { timestamp: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                admin: true,
                listing: true,
            },
        }),
    ]);

    // Serialize dates for Next.js
    const auditEntries = logsRaw.map((log: any) => ({
        ...log,
        timestamp: log.timestamp.toISOString(),
        listing: {
            ...log.listing,
            submittedAt: log.listing.submittedAt.toISOString(),
            lastModified: log.listing.lastModified.toISOString()
        }
    }));

    // Calculate RecentActivity (today) count
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    const recentActivity = await prisma.auditLogEntry.count({
        where: {
            timestamp: {
                gte: todayStart,
                lte: todayEnd,
            },
        },
    });

    // Calculate unique active admins
    const activeAdmins = await prisma.auditLogEntry.groupBy({
        by: ['adminId'],
        _count: { adminId: true },
    });

    // Build statusData as an object
    const statusData = {
        total,
        recentActivity,
        activeAdmins: activeAdmins.length,
    };

    // Build dynamic pageSizeOptions
    const pageSizeOptions = [5, 10, 20, 50, 100].filter((opt) => opt <= total);
    if (!pageSizeOptions.includes(limit)) pageSizeOptions.push(limit);
    pageSizeOptions.sort((a, b) => a - b);

    return {
        props: {
            auditEntries,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            statusData,
            pageSizeOptions,
        },
    };
};
