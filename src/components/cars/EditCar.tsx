/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../layout/Layout";
import dynamic from "next/dynamic";
import CarFormFieldsSkeleton from "./components/skeletons/CarFormFieldsSkeleton";
import CarFormHeaderSkeleton from "./components/skeletons/CarFormHeaderSkeleton";
import { useAuth } from "../context/AuthContext";
import { useFeedback } from "../context/FeedbackContext";

const CarFormHeader = dynamic(() => import('@/components/cars/components/CarFormHeader'), {
    ssr: false,
    loading: () => <CarFormHeaderSkeleton />,
});

const CarFormFields = dynamic(() => import('@/components/cars/components/CarFormFields'), {
    ssr: false,
    loading: () => <CarFormFieldsSkeleton />,
});

const EditCar = ({ car }: { car: any, }) => {
    const router = useRouter();
    const { user } = useAuth()
    const { showError, showSuccess } = useFeedback()

    const [formData, setFormData] = useState({
        id: car.id || "",
        title: car.title || "",
        description: car.description || "",
        price: car.price || 0,
        location: car.location || "",
        year: car.year || 2020,
        make: car.make || "",
        model: car.model || "",
        mileage: car.mileage || 0,
        fuelType: car.fuelType || "",
        transmission: car.transmission || "",
        imageUrl: car.imageUrl || "",
    });

    const [formLoading, setFormLoading] = useState<boolean>(false);

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !car?.id) return;

        setFormLoading(true);
        try {
            const res = await fetch(`/api/car/${car.slug}/${car.code}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    year: Number(formData.year),
                    mileage: Number(formData.mileage),
                    adminId: user.id,
                }),
            });

            if (!res.ok) throw new Error("Failed to update car");
            showSuccess("Listing updated successfully!");
            router.back();
        } catch (error) {
            showError("An error occurred while updating the listing.");
        } finally {
            setFormLoading(false);
        }
    };


    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-4 md:px-0">
                <CarFormHeader carTitle={car.title} />
                <CarFormFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    formLoading={formLoading}
                />
            </div>
        </Layout>
    );
};

export default EditCar;
