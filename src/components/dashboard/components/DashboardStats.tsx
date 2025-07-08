/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Car, CheckCircle, XCircle, Calendar } from 'lucide-react';

const DashboardStats = ({ filteredListings }: any) => {
    const statusCounts = {
        total: filteredListings.length,
        pending: filteredListings.filter((l: any) => l.status === 'pending').length,
        approved: filteredListings.filter((l: any) => l.status === 'approved').length,
        rejected: filteredListings.filter((l: any) => l.status === 'rejected').length,
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            <StatCard title="Total" value={statusCounts.total} icon={<Car />} />
            <StatCard title="Pending" value={statusCounts.pending} icon={<Calendar />} />
            <StatCard title="Approved" value={statusCounts.approved} icon={<CheckCircle />} />
            <StatCard title="Rejected" value={statusCounts.rejected} icon={<XCircle />} />
        </div>
    );
};

const StatCard = ({ title, value, icon }: any) => (
    <div className="bg-white p-4 rounded shadow border flex justify-between items-center">
        <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
    </div>
);

export default DashboardStats;
