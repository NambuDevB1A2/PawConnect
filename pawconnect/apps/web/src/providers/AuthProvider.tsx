'use client';

import { Enums } from "@/types/enum";
import React, { createContext, useEffect, useState } from "react";

export type AuthUser = {
    sub: string;
    role: Enums.Role;
};

interface AuthContextType {
    login: boolean;
    user: AuthUser;
};

export const AuthContext = createContext<AuthContextType>({
    login: false,
    user: {
        sub: "",
        role: Enums.Role.GUEST,
    },
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser>({ sub: "", role: Enums.Role.GUEST });
    const [login, setLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        
    }, []);
    
    return (
        <AuthContext.Provider value={{ login, user }}>
            {children}
        </AuthContext.Provider>
    );
}