/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import DashboardFilters from '@/components/dashboard/components/DashboardFilters';
import DashboardConfirmDialog from '@/components/dashboard/components/DashboardConfirmDialog';
import { useCarListing } from '@/components/context/CarListingContext';
import dynamic from 'next/dynamic';
import DashboardTableSkeleton from '@/components/dashboard/components/skeletons/DashboardTableSkeleton';
import DashboardGridSkeleton from '@/components/dashboard/components/skeletons/DashboardGridSkeleton';
import DashboardStatsSkeleton from '@/components/dashboard/components/skeletons/DashboardStatsSkeleton ';
import { CarListing } from '../lib/dataStore';

const DashboardStats = dynamic(
    () => import('@/components/dashboard/components/DashboardStats'), {
    ssr: false,
    loading: () => <DashboardStatsSkeleton />
}
)

const DashboardTable = dynamic(
    () => import('@/components/dashboard/components/DashboardTable'), {
    ssr: false,
    loading: () => <DashboardTableSkeleton />
}
)
const DashboardGrid = dynamic(
    () => import('@/components/dashboard/components/DashboardGrid'), {
    ssr: false,
    loading: () => <DashboardGridSkeleton />
}
)

const DashboardPage = () => {
    const { filteredListings, totalPages, total, filters, loading, updateFilter, resetFilters, approveListingContext, rejectListingContext } = useCarListing();
    const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();

    const handleStatusChange = async (listingId: string, newStatus: 'approved' | 'rejected') => {
        try {
            if (newStatus === 'approved') {
                approveListingContext(listingId);
                toast.success('Listing approved successfully!');
            } else {
                rejectListingContext(listingId);
                toast.error('Listing rejected successfully!');
            }
        } catch (error) {
            toast.error('Failed to update listing status.');
        }
        setShowConfirmDialog(null);
    };

    const handleEdit = (car: CarListing) => {
        router.push(`/dashboard/${car.slug}/${car.code}`);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="px-4">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-600">Manage car rental listings and review submissions</p>
                </div>

                <DashboardStats filteredListings={filteredListings} />

                <DashboardFilters
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                    </div>
                ) : (
                    <>
                        {viewMode === 'table' ? (
                            <DashboardTable
                                listings={filteredListings}
                                handleEdit={handleEdit}
                                handleStatusChange={handleStatusChange}
                                setShowConfirmDialog={setShowConfirmDialog}
                            />
                        ) : (
                            <DashboardGrid
                                listings={filteredListings}
                                handleEdit={handleEdit}
                                handleStatusChange={handleStatusChange}
                                setShowConfirmDialog={setShowConfirmDialog}
                            />
                        )}

                        {/* <DashboardPagination
                            totalPages={totalPages}
                            total={total}
                            filters={filters}
                            updateFilter={updateFilter}
                        /> */}
                    </>
                )}

                <DashboardConfirmDialog
                    showConfirmDialog={showConfirmDialog}
                    setShowConfirmDialog={setShowConfirmDialog}
                    handleStatusChange={handleStatusChange}
                />
            </div>
        </Layout>
    );
};

export default DashboardPage;
