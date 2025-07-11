/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import DashboardFilters from '@/components/dashboard/components/DashboardFilters';
import DashboardConfirmDialog from '@/components/dashboard/components/DashboardConfirmDialog';
import dynamic from 'next/dynamic';
import DashboardTableSkeleton from '@/components/dashboard/components/skeletons/DashboardTableSkeleton';
import DashboardGridSkeleton from '@/components/dashboard/components/skeletons/DashboardGridSkeleton';
import { DataPagination } from '@/components/ui/data-pagination';
import DashboardStatsSkeleton from '@/components/dashboard/components/skeletons/DashboardStatsSkeleton';
import { useFeedback } from '../context/FeedbackContext';

const DashboardStats = dynamic(
    () => import('@/components/dashboard/components/DashboardStats'),
    {
        ssr: false,
        loading: () => <DashboardStatsSkeleton />,
    }
);

const DashboardTable = dynamic(
    () => import('@/components/dashboard/components/DashboardTable'),
    {
        ssr: false,
        loading: () => <DashboardTableSkeleton />,
    }
);

const DashboardGrid = dynamic(
    () => import('@/components/dashboard/components/DashboardGrid'),
    {
        ssr: false,
        loading: () => <DashboardGridSkeleton />,
    }
);

const DashboardPage = ({
    listings: initialListings,
    total,
    page,
    limit,
    statusData,
    currentStatus,
    pageSizeOptions,
}: any) => {
    const { showError, showSuccess } = useFeedback()
    const [listings, setListings] = useState([]);

    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [showFilters, setShowFilters] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        // Update listings state when initialListings prop changes
        setListings(
            initialListings.reduce((acc: any, item: any) => {
                acc[item.id] = item;
                return acc;
            }, {})
        );
    }, [initialListings]);

    const handlePageChange = (newPage: number) => {
        router.push(`/dashboard?page=${newPage}&limit=${limit}&status=${currentStatus}`);
    };

    const handlePageSizeChange = (newLimit: number) => {
        router.push(`/dashboard?page=1&limit=${newLimit}&status=${currentStatus}`);
    };

    const handleFilterChange = (newStatus: string) => {
        router.push(`/dashboard?page=1&limit=${limit}&status=${newStatus}`);
    };

    const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
        try {
            const res = await fetch("/api/car/status", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });

            const data = await res.json();

            if (res.ok) {
                setListings((prev: any) => ({
                    ...prev,
                    [data.car.id]: { ...data.car, status }
                }));

                showSuccess(`Car status updated to ${status} successfully.`);
            } else {
                showError(data.error || 'Failed to update car status.');
            }
        } catch (error) {
            console.error(error);
            showError('Failed to update car status.');
        } finally {
            setShowConfirmDialog(null);
        }
    };


    const handleEdit = (listing: any) => {
        router.push(`/dashboard/${listing.slug}/${listing.code}`);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="px-4">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-600">Manage car rental listings and review submissions</p>
                </div>

                <DashboardStats statusCounts={statusData} />

                <DashboardFilters
                    filters={{ status: currentStatus }}
                    updateFilter={(value: any) => handleFilterChange(value)}
                    resetFilters={() => handleFilterChange('all')}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />

                {listings?.length === 0 ? (
                    <div className="text-center py-10">No listings found.</div>
                ) : (
                    <>
                        {viewMode === 'table' ? (
                            <DashboardTable
                                listings={Object.values(listings)}
                                handleEdit={handleEdit}
                                handleStatusChange={handleStatusChange}
                                setShowConfirmDialog={setShowConfirmDialog}
                            />
                        ) : (
                            <DashboardGrid
                                listings={Object.values(listings)}
                                handleEdit={handleEdit}
                                handleStatusChange={handleStatusChange}
                                setShowConfirmDialog={setShowConfirmDialog}
                            />
                        )}

                        <div className="mt-4">
                            <DataPagination
                                currentPage={page}
                                totalItems={total}
                                pageSize={limit}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                                pageSizeOptions={pageSizeOptions}
                                showingText="cars"
                            />
                        </div>
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
