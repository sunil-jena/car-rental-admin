'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CarFormHeaderSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Skeleton className="h-10 w-40" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    );
};

export default CarFormHeaderSkeleton;
