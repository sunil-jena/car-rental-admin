'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Multiple admin users
const adminUsers = [
    {
        id: '1',
        email: 'admin@carrentals.com',
        name: 'John Smith',
        role: 'admin',
        password: 'admin123'
    },
    {
        id: '2',
        email: 'manager@carrentals.com',
        name: 'Sarah Johnson',
        role: 'admin',
        password: 'manager123'
    },
    {
        id: '3',
        email: 'supervisor@carrentals.com',
        name: 'Mike Wilson',
        role: 'admin',
        password: 'supervisor123'
    }
];

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        const savedUser = localStorage.getItem('admin_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        // Find admin user by email and password
        const adminUser = adminUsers.find(admin =>
            admin.email === email && admin.password === password
        );

        if (adminUser) {
            const user = {
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                role: adminUser.role
            };
            setUser(user);
            localStorage.setItem('admin_user', JSON.stringify(user));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};