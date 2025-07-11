/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import DashboardPage from '@/components/dashboard/Dashboard';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { CarListing } from '@/components/types/type';

export default function Dashboard({
    listings,
    total,
    page,
    limit,
    statusData,
    currentStatus,
    pageSizeOptions,
}: {
    listings: CarListing;
    total: number;
    page: number;
    limit: number;
    statusData: any;
    currentStatus: string;
    pageSizeOptions: number[]
}) {
    return (
        <DashboardPage
            listings={listings}
            total={total}
            page={page}
            limit={limit}
            statusData={statusData}
            currentStatus={currentStatus}
            pageSizeOptions={pageSizeOptions}
        />
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

    //status as string (not number)
    const status = (context.query.status as string) || "all";

    // where filter based on status
    const where = status === "all" ? {} : { status };

    // Get total count for filtered query
    const totalPromise = prisma.carListing.count({
        where,
    });

    // Get paginated listings
    const listingsPromise = prisma.carListing.findMany({
        where,
        orderBy: { submittedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
    });

    //Get individual status counts
    const pendingPromise = prisma.carListing.count({ where: { status: 'pending' } });
    const approvedPromise = prisma.carListing.count({ where: { status: 'approved' } });
    const rejectedPromise = prisma.carListing.count({ where: { status: 'rejected' } });

    const [total, listingsRaw, pendingCount, approvedCount, rejectedCount] = await Promise.all([
        totalPromise,
        listingsPromise,
        pendingPromise,
        approvedPromise,
        rejectedPromise,
    ]);

    //Serialize dates
    const listings = listingsRaw.map((listing: any) => ({
        ...listing,
        submittedAt: listing.submittedAt ? listing.submittedAt.toISOString() : null,
        lastModified: listing.lastModified ? listing.lastModified.toISOString() : null,
    }));

    //Build status data summary
    const statusData = {
        total,
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
    };

    // Build dynamic pageSizeOptions
    const pageSizeOptions = [5, 10, 20, 50, 100].filter((opt) => opt <= total);
    if (!pageSizeOptions.includes(limit)) pageSizeOptions.push(limit);
    pageSizeOptions.sort((a, b) => a - b);

    return {
        props: {
            listings,
            total,
            page,
            limit,
            statusData,
            currentStatus: status,
            pageSizeOptions,
        },
    };
};
