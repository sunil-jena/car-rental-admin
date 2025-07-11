'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AuditLogListSkeleton = () => {
    return (
        <div className='rounded-lg border bg-white shadow-sm'>
            <div className='flex flex-col space-y-1.5 p-6'>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>

            <div className='p-6'>
                <div className="space-y-4">
                    {Array(5).fill(null).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <Skeleton className="h-4 w-4 rounded" />
                            </div>

                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className="h-3 w-24" />
                                </div>

                                <Skeleton className="h-3 w-full" />

                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuditLogListSkeleton;
