'use client'
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { data: session } = useSession();

    // Sync NextAuth session user into your AuthContext
    useEffect(() => {
        if (session?.user) {
            const { id, email, name, role } = session.user as User;
            setUser({ id, email, name, role });
        } else {
            setUser(null);
        }
    }, [session]);

    // Optional: persist user in localStorage (not recommended if using NextAuth session only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (user) {
                localStorage.setItem('auth_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('auth_user');
            }
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
