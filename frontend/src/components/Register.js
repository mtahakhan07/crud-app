import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const success = await register(username, password);
        if (success) {
            navigate("/notes");
        } else {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Create Account</h2>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Create Account
                </button>
            </form>

            <p style={styles.login}>
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    button: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "10px",
    },
    login: {
        marginTop: "15px",
        textAlign: "center",
    }
};

export default Register; 