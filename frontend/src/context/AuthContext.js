import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in (on app load)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            // Set axios default header for auth
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { username, password });
            const { token } = response.data;

            // Save token to localStorage
            localStorage.setItem("token", token);

            // Set axios default header for auth
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setToken(token);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    // Register function
    const register = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", { username, password });
            const { token } = response.data;

            // Save token to localStorage
            localStorage.setItem("token", token);

            // Set axios default header for auth
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setToken(token);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            return false;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Call the logout endpoint (optional)
            await axios.post("/api/auth/logout");

            // Remove token from localStorage
            localStorage.removeItem("token");

            // Remove Authorization header
            delete axios.defaults.headers.common["Authorization"];

            setToken(null);
            setIsAuthenticated(false);
            return true;
        } catch (error) {
            console.error("Logout error:", error);

            // Even if the server request fails, clear local auth state
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setToken(null);
            setIsAuthenticated(false);

            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}; 