/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import EditCar from "@/components/cars/EditCar";
import { CarListing } from "@/components/types/type";

interface PageProps {
    car: CarListing;
}

export default function CarDetailsPage({ car }: PageProps) {
    return <EditCar car={car} />;
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

    const { slug, code } = context.params as { slug: string; code: string };

    const car = await prisma.carListing.findFirst({
        where: { slug, code },
    });

    if (!car) {
        return { notFound: true };
    }

    return {
        props: {
            car: {
                ...car,
                submittedAt: car.submittedAt ? car.submittedAt.toISOString() : null,
                lastModified: car.lastModified ? car.lastModified.toISOString() : null,
            },
        },
    };
};
