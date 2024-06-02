import React, {
    createContext, useState, useEffect
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authstate, setAuthstate] = useState({
        isAuthenticated: false,
        token: null,
        Email: null,
    });
    
    const login = (token, Email) => {
        setAuthstate({
            isAuthenticated: true,
            token: token,
            Email: Email,
        });
    };

    const logout = () => {
        setAuthstate({
            isAuthenticated: false,
            token: null,
            Email: null,
        });
    };

    return (
        <AuthContext.Provider
            value={{ authstate, login, logout }}>
                {children}
            </AuthContext.Provider>

    );
};
        
            