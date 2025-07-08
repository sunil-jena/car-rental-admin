'use client';
import React from 'react';

interface DashboardConfirmDialogProps {
    showConfirmDialog: string | null;
    setShowConfirmDialog: (value: string | null) => void;
    handleStatusChange: (listingId: string, newStatus: 'approved' | 'rejected') => void;
}

const DashboardConfirmDialog: React.FC<DashboardConfirmDialogProps> = ({
    showConfirmDialog,
    setShowConfirmDialog,
    handleStatusChange,
}) => {
    if (!showConfirmDialog) return null;

    const [action, listingId] = showConfirmDialog.split('-');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to {action} this listing?
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setShowConfirmDialog(null)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (action === 'reject') {
                                handleStatusChange(listingId, 'rejected');
                            }
                            setShowConfirmDialog(null);
                        }}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardConfirmDialog;
