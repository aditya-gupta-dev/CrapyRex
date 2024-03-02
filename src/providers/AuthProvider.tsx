import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import React from "react";

interface AuthProviderProps {
    user: User | null;
    children: React.ReactNode;
};

const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
    return (
        <AuthContext.Provider value={user}>
            { children }
        </AuthContext.Provider>  
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("Can only be used inside AuthProvider");
    };
    return context;
}
