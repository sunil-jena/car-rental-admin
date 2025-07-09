/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import {
    CheckCircle,
    XCircle,
    DollarSign,
    MapPin,
    Calendar,
    User,
    Settings,
    Fuel,
    Edit,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const DashboardTable = ({
    listings,
    handleEdit,
    handleStatusChange,
    setShowConfirmDialog,
}: any) => {

    const getStatusBadge = (status: string) => {
        const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
        switch (status) {
            case 'approved':
                return (
                    <span className={`${baseClasses} bg-green-100 text-green-800`}>
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className={`${baseClasses} bg-red-100 text-red-800`}>
                        Rejected
                    </span>
                );
            case 'pending':
                return (
                    <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
                        Pending
                    </span>
                );
            default:
                return (
                    <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
                        {status}
                    </span>
                );
        }
    };

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
                        <TableRow key={listing.id}>
                            <TableCell>
                                <div className="flex items-center">
                                    <Image
                                        src={listing.imageUrl}
                                        alt={listing.title}
                                        height={1080}
                                        width={720}
                                        className="w-16 h-12 object-cover rounded"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400';
                                        }}
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            {listing.year} {listing.make} {listing.model}
                                        </p>
                                        <p className="text-xs text-gray-400">{listing.title}</p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="text-xs text-gray-600">
                                <div className="flex items-center gap-1 mb-1">
                                    <Settings className="h-3 w-3" />
                                    {listing.transmission}
                                </div>
                                <div className="flex items-center gap-1 mb-1">
                                    <Fuel className="h-3 w-3" />
                                    {listing.fuelType}
                                </div>
                                <div>{listing.mileage.toLocaleString()} miles</div>
                            </TableCell>

                            <TableCell className="text-sm font-medium text-gray-900">
                                <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    {listing.price}/day
                                </div>
                            </TableCell>

                            <TableCell className="text-sm text-gray-600">
                                <div className="flex items-center line-clamp-1 truncate">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {listing.location}
                                </div>
                            </TableCell>

                            <TableCell className="text-xs text-gray-600">
                                <div className="flex items-center gap-1 mb-1">
                                    <User className="h-3 w-3" />
                                    {listing.submittedBy}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(listing.submittedAt).toLocaleDateString()}
                                </div>
                            </TableCell>

                            <TableCell>{getStatusBadge(listing.status)}</TableCell>

                            <TableCell>
                                <div className="flex justify-end items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(listing)}
                                        className="flex items-center gap-1"
                                    >
                                        <Edit className="h-4 w-4" />
                                        {/* Edit */}
                                    </Button>
                                    {listing.status === 'pending' && (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => handleStatusChange(listing.id, 'approved')}
                                                className="p-1 bg-green-500 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                                title="Approve"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                {/* Approve */}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setShowConfirmDialog(`reject-${listing.id}`)}
                                                title="Reject"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                {/* Reject */}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DashboardTable;
