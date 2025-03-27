import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Notes App</h1>
            <div style={styles.buttonContainer}>
                <Link to="/login" style={styles.button}>
                    Sign In
                </Link>
                <Link to="/register" style={styles.button}>
                    Create Account
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "20px",
        textAlign: "center",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "2rem",
        color: "#333",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "300px",
    },
    button: {
        display: "block",
        padding: "12px 20px",
        backgroundColor: "#007bff",
        color: "white",
        textDecoration: "none",
        borderRadius: "4px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1rem",
    },
};

export default LandingPage; 