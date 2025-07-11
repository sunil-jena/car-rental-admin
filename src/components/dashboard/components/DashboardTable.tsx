/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
} from '@/components/ui/table';
import DashboardTableRow from '@/components/dashboard/components/DashboardTableRow';

const DashboardTable = ({
    listings,
    handleEdit,
    handleStatusChange,
    setShowConfirmDialog,
}: any) => {

    return (
        <div className="bg-white rounded-lg shadow border overflow-hidden mx-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {listings.map((listing: any) => (
                        <DashboardTableRow
                            key={listing.id}
                            listing={listing}
                            handleEdit={handleEdit}
                            handleStatusChange={handleStatusChange}
                            setShowConfirmDialog={setShowConfirmDialog}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DashboardTable;
