/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import { AuditLogEntry, dataStore } from '@/components/lib/dataStore';
import { DataPagination } from '@/components/ui/data-pagination';
import AuditLogListSkeleton from '@/components/audit/components/skeletons/AuditLogListSkeleton ';
import AuditLogStatsSkeleton from '@/components/audit/components/skeletons/AuditLogStatsSkeleton';

const AuditLogList = dynamic(
    () => import('@/components/audit/components/AuditLogList'), {
    ssr: false,
    loading: () => <AuditLogListSkeleton />
}
)

const AuditLogStats = dynamic(
    () => import('@/components/audit/components/AuditLogStats'), {
    ssr: false,
    loading: () => <AuditLogStatsSkeleton />
}
)

const AuditLog = () => {
    const [auditEntries, setAuditEntries] = useState<AuditLogEntry[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [total, setTotal] = useState(0);

    const loadAuditLog = () => {
        const result = dataStore.getAuditLog(currentPage, itemsPerPage);
        setAuditEntries(result.logs);
        setTotal(result.total);
    };

    useEffect(() => {
        loadAuditLog();
    }, [currentPage, itemsPerPage]);

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
                    <p className="text-gray-600 mt-2">Track all administrative actions and changes</p>
                </div>

                {/* Stats */}
                <AuditLogStats auditEntries={auditEntries} total={total} />

                {/* List */}
                <AuditLogList entries={auditEntries} />

                {/* Pagination */}
                <div className="mt-4">
                    <DataPagination
                        currentPage={currentPage}
                        totalItems={total}
                        pageSize={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setItemsPerPage}
                        showingText="audit-logs"
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AuditLog;
