"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LogoutDialog from "./components/LogoutDialog";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            router.replace("/");

        } else {
            console.error("Logout failed");
        }
        router.replace("/");
        setShowLogoutConfirm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                user={user}
                setShowLogoutConfirm={setShowLogoutConfirm}
                sidebarOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className={`lg:ml-64 transition-all duration-300`}>
                <Header user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6">{children}</main>
            </div>

            <LogoutDialog
                show={showLogoutConfirm}
                onCancel={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default Layout;
