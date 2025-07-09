/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Car, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardStats = ({ filteredListings }: any) => {
    const statusCounts = {
        total: filteredListings.length,
        pending: filteredListings.filter((l: any) => l.status === 'pending').length,
        approved: filteredListings.filter((l: any) => l.status === 'approved').length,
        rejected: filteredListings.filter((l: any) => l.status === 'rejected').length,
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Total</CardTitle>
                    <Car className="h-6 w-6 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusCounts.total}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Pending</CardTitle>
                    <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusCounts.pending}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Approved</CardTitle>
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusCounts.approved}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Rejected</CardTitle>
                    <XCircle className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusCounts.rejected}</div>
                </CardContent>
            </Card>
        </div>
    );
};


export default DashboardStats;
