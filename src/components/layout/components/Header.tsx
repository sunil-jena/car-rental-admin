"use client";
import React from "react";
import { Menu } from "lucide-react";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface HeaderProps {
    user: User | null;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, toggleSidebar }) => (
    <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
            <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded lg:hidden"
            >
                <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Welcome back, {user?.name}</span>
            </div>
        </div>
    </div>
);

export default Header;
