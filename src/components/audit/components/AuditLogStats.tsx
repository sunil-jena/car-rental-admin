'use client';
import React from 'react';
import { Calendar, User, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    statusData: {
        total: number;
        recentActivity: number;
        activeAdmins: number;
    };
}

const AuditLogStats: React.FC<Props> = ({ statusData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Total Actions</CardTitle>
                    <FileText className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusData.total}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Today's Activity</CardTitle>
                    <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusData.recentActivity}</div>
                    <p className="text-xs text-gray-500">Today</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-gray-400">Active Admins</CardTitle>
                    <User className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusData.activeAdmins}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLogStats;
