'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardStatsSkeleton = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {Array(4)
                .fill(null)
                .map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded shadow border flex justify-between items-center"
                    >
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded" />
                    </div>
                ))}
        </div>
    );
};

export default DashboardStatsSkeleton;
