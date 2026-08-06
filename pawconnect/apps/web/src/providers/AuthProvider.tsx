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

    const logout = useCallback(() => {
        setUser(undefined);
        router.push('/login');
        Logout();
    }, [router]);

    useEffect(() => {
        // 액세스 토큰 만료(401) 시 fetch.ts에서 발생시키는 이벤트를 받아 자동 로그아웃 처리
        const handleTokenExpired = () => logout();
        window.addEventListener('auth:expired', handleTokenExpired);
        return () => window.removeEventListener('auth:expired', handleTokenExpired);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ login, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}