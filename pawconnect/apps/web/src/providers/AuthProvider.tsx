'use client';

import { Logout } from "@/services/auth/logout.server";
import { User } from "@/types/auth/user.type";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextType {
    login: boolean;
    user: User | undefined;
    setUser: (value: User | undefined) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    login: false,
    user: undefined,
    setUser: () => {},
    logout: () => {},
});

export default function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser?: User }) {
    const [user, setUser] = useState<User | undefined>(initialUser);
    const router = useRouter();

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const login = user !== undefined;

    const logout = useCallback(async () => {
        try {
            await Logout();
        } catch (e) {
            console.log("로그아웃 중 오류 발생");
        } finally {
            setUser(undefined);
            router.replace('/login');
        }
    }, [router]);

    useEffect(() => {
        const handleTokenExpired = () => {
            logout();
        };
        window.addEventListener('auth:expired', handleTokenExpired);
        return () => window.removeEventListener('auth:expired', handleTokenExpired);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ login, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}