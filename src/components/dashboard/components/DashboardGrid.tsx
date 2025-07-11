/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { CheckCircle, XCircle, DollarSign, MapPin, Edit } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const DashboardGrid = ({ listings, handleEdit, handleStatusChange, setShowConfirmDialog }: any) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {listings.map((listing: any) => (
            <div key={listing.id} className="bg-white rounded shadow border overflow-hidden">
                <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    height={1080}
                    width={720}
                    className="w-72 h-40 object-cover rounded"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400';
                    }}
                />
                <div className="p-4 space-y-2">
                    <p className="text-sm font-medium text-gray-900">{listing.year} {listing.make} {listing.model}</p>
                    <p className="text-xs text-gray-400">{listing.title}</p>
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location}
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-900">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {listing.price}/day
                    </div>
                    <div className="flex items-center justify-end space-x-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(listing)}
                            className="flex items-center gap-1"
                        >
                            <Edit className="h-4 w-4" />
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
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => setShowConfirmDialog(`reject-${listing.id}`)}
                                    title="Reject"
                                >
                                    <XCircle className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default React.memo(DashboardGrid);
