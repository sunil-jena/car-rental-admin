import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CarFormHeader = ({ carTitle }: { carTitle: string }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 self-start"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Button>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Edit {carTitle}
                </h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Update car rental listing details
                </p>
            </div>
        </div>
    );
};

export default CarFormHeader;
