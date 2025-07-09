/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import { AuditLogEntry, dataStore } from '@/components/lib/dataStore';
import { DataPagination } from '@/components/ui/data-pagination';
import AuditLogListSkeleton from '@/components/audit/components/skeletons/AuditLogListSkeleton ';
import AuditLogStatsSkeleton from '@/components/audit/components/skeletons/AuditLogStatsSkeleton';

const AuditLogList = dynamic(
    () => import('@/components/audit/components/AuditLogList'),
    {
        ssr: false,
        loading: () => <AuditLogListSkeleton />,
    }
);

const AuditLogStats = dynamic(
    () => import('@/components/audit/components/AuditLogStats'),
    {
        ssr: false,
        loading: () => <AuditLogStatsSkeleton />,
    }
);

const AuditLog = () => {
    const [auditEntries, setAuditEntries] = useState<AuditLogEntry[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);

    const loadAuditLog = () => {
        const result = dataStore.getAuditLog(currentPage, itemsPerPage);
        setAuditEntries(result.logs);
        setTotal(result.total);
    };

    useEffect(() => {
        loadAuditLog();
    }, [currentPage, itemsPerPage]);

    // Dynamically build pageSizeOptions based on total
    const pageSizeOptions = useMemo(() => {
        const options = [5, 10, 20, 50, 100].filter(opt => opt <= total);
        if (!options.includes(itemsPerPage)) {
            options.push(itemsPerPage);
        }
        return options.sort((a, b) => a - b);
    }, [total, itemsPerPage]);

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
                    <p className="text-gray-600 mt-2">Track all administrative actions and changes</p>
                </div>

                <AuditLogStats auditEntries={auditEntries} total={total} />

                <AuditLogList entries={auditEntries} />

                <div className="mt-4">
                    <DataPagination
                        currentPage={currentPage}
                        totalItems={total}
                        pageSize={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                            setItemsPerPage(size);
                            setCurrentPage(1);
                        }}
                        pageSizeOptions={pageSizeOptions}
                        showingText="audits"
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AuditLog;
