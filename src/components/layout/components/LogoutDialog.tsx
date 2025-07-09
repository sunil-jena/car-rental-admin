"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface LogoutDialogProps {
    show: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ show, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
                <div className="flex justify-end space-x-3">
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LogoutDialog;
