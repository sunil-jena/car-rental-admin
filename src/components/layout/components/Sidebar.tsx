"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, LayoutDashboard, FileText, LogOut, X } from "lucide-react";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface SidebarProps {
    user: User | null;
    setShowLogoutConfirm: (show: boolean) => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, setShowLogoutConfirm, sidebarOpen, toggleSidebar }) => {
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Audit Log", href: "/audit-log", icon: FileText },
    ];

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-4 bg-black text-white border-b border-gray-800">
                        <div className="flex items-center">
                            <Car className="h-8 w-8 mr-2" />
                            <span className="text-xl font-bold">Car Dekho</span>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-1 text-gray-400 hover:text-white rounded lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-white text-black"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-medium">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-400">{user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
