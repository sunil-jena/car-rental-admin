'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {Array(8)
                .fill(null)
                .map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded shadow border overflow-hidden"
                    >
                        <Skeleton className="w-full h-40" />
                        <div className="p-4 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-3 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                            <div className="flex items-center space-x-2 pt-2">
                                <Skeleton className="h-6 w-6 rounded" />
                                <Skeleton className="h-6 w-6 rounded" />
                                <Skeleton className="h-6 w-6 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default DashboardGridSkeleton;
