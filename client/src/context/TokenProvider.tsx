import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

interface TokenContextType {
    isLoggedin: boolean;
    login: ()=> void;
    logout: ()=> void;
}

const TokenContext = createContext<TokenContextType | null>(null);

export const useToken = () => {
    const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
}

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedin, SetisLoggedin] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            SetisLoggedin(false);
        } else {
            axios.get('http://localhost:5000/api/users/verifyToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log("Token verification response");
                    if (res.data.success) {
                        SetisLoggedin(true);
                    } else {
                        SetisLoggedin(false);
                    }
                }
                ).catch((err) => {
                    console.error("Token verification error:", err);
                    SetisLoggedin(false);
                });
        }
    });

    const login = ()=>{
        SetisLoggedin(true);
    }

    const logout = ()=>{
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_id");
        SetisLoggedin(false);
    }
    return (
        <TokenContext.Provider value = {{isLoggedin , login , logout}}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider
