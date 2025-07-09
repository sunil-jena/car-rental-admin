'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AuditLogStatsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(null).map((_, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-24" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4 rounded" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-3 w-12 mt-1" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AuditLogStatsSkeleton;
