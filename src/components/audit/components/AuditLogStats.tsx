'use client';
import React from 'react';
import { Calendar, User, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditLogEntry } from '@/components/lib/dataStore';

interface Props {
    auditEntries: AuditLogEntry[];
    total: number;
}

const AuditLogStats: React.FC<Props> = ({ auditEntries, total }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{total}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {auditEntries.filter(entry => {
                            const entryDate = new Date(entry.timestamp);
                            const today = new Date();
                            return entryDate.toDateString() === today.toDateString();
                        }).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {new Set(auditEntries.map(entry => entry.adminId)).size}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLogStats;
