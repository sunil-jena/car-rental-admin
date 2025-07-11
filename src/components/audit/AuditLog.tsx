/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import Layout from '@/components/layout/Layout';
import { DataPagination } from '@/components/ui/data-pagination';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import AuditLogListSkeleton from '@/components/audit/components/skeletons/AuditLogListSkeleton';
import AuditLogStatsSkeleton from '@/components/audit/components/skeletons/AuditLogStatsSkeleton';

const AuditLogList = dynamic(() => import('@/components/audit/components/AuditLogList'), {
  ssr: false,
  loading: () => <AuditLogListSkeleton />,
});

const AuditLogStats = dynamic(() => import('@/components/audit/components/AuditLogStats'), {
  ssr: false,
  loading: () => <AuditLogStatsSkeleton />,
});

const AuditLog = ({ auditEntries, total, page, limit, statusData, pageSizeOptions }: any) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/audit?page=${newPage}&limit=${limit}`);
  };

  const handlePageSizeChange = (newLimit: number) => {
    router.push(`/audit?page=1&limit=${newLimit}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600 mt-2">Track all administrative actions and changes</p>
        </div>

        <AuditLogStats statusData={statusData} />

        <AuditLogList entries={auditEntries} />

        <div className="mt-4">
          <DataPagination
            currentPage={page}
            totalItems={total}
            pageSize={limit}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={pageSizeOptions}
            showingText="audits"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AuditLog;
