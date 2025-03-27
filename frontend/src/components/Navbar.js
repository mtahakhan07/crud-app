import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.logo}>Notes App</Link>

            {isAuthenticated ? (
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            ) : (
                <div style={styles.authLinks}>
                    <Link to="/login" style={styles.link}>Sign In</Link>
                    <Link to="/register" style={styles.link}>Create Account</Link>
                </div>
            )}
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
        marginBottom: "20px",
    },
    logo: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "white",
        textDecoration: "none",
    },
    authLinks: {
        display: "flex",
        gap: "15px",
    },
    link: {
        color: "white",
        textDecoration: "none",
    },
    logoutButton: {
        padding: "8px 16px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default Navbar; 