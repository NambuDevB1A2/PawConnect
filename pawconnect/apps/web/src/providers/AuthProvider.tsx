'use client';

import { User } from "@/types/auth/user.type";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
    login: boolean;
    user: User | undefined;
    setUser: (value: User | undefined) => void;
};

export const AuthContext = createContext<AuthContextType>({
    login: false,
    user: undefined,
    setUser: () => {},
});

export default function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser?: User }) {
    const [user, setUser] = useState<User | undefined>(initialUser);
    
    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const login = user !== undefined;
    
    
    return (
        <AuthContext.Provider value={{ login, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}