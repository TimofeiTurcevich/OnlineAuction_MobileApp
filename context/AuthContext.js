import React, { createContext, useEffect, useState } from "react";
import { getUserId, login } from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);


    const logIn = async (username, password) => {
        setUserToken(await login(username, password))
        setUserId(await getUserId(await login(username, password)))
    }

    const logout = () => {
        setUserToken(undefined)
        setUserId(undefined)
    }

    return (
        <AuthContext.Provider value={{ userToken, logIn, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
}