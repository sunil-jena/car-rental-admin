'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AuditLogStatsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(null).map((_, index) => (
                <div key={index} className='rounded-lg border bg-white shadow-sm p-5'>
                    <div className="flex flex-row items-center justify-between space-y-0">
                        <div className="text-sm font-medium">
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-4 w-4 rounded" />
                    </div>
                    <div className='p-6'>
                        <Skeleton className="h-2 w-16" />
                        <Skeleton className="h-3 w-12 mt-1" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuditLogStatsSkeleton;
