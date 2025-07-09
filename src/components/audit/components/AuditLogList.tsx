'use client';
import React from 'react';
import { FileText, CheckCircle, XCircle, Edit3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditLogEntry } from '@/components/lib/dataStore';

interface Props {
    entries: AuditLogEntry[];
}

const AuditLogList: React.FC<Props> = ({ entries }) => {
    const getActionIcon = (action: string) => {
        switch (action) {
            case 'approved':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-600" />;
            case 'edited':
                return <Edit3 className="h-4 w-4 text-blue-600" />;
            default:
                return <FileText className="h-4 w-4 text-gray-600" />;
        }
    };

    const getActionBadge = (status: string) => {
        const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
        switch (status) {
            case 'approved':
                return <span className={`${baseClasses} bg-green-100 text-green-800`}>Approved</span>;
            case 'rejected':
                return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>;
            case 'edited':
                return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Edited</span>;
            default:
                return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Action History</CardTitle>
                <CardDescription>Chronological log of all administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {entries.map(entry => (
                        <div
                            key={entry.id}
                            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex-shrink-0 mt-1">{getActionIcon(entry.action)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm font-medium text-gray-900">{entry.adminName}</p>
                                        {getActionBadge(entry.action)}
                                    </div>
                                    <p className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{entry.details}</p>
                                <p className="text-xs text-gray-500 mt-1">Listing ID: {entry.listingId}</p>
                            </div>
                        </div>
                    ))}

                    {entries.length === 0 && (
                        <div className="text-center py-8">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No audit entries found.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AuditLogList;
