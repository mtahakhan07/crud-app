import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        const success = await login(username, password);
        if (success) {
            navigate("/notes");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Sign In</h2>
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

                <button type="submit" style={styles.button}>
                    Sign In
                </button>
            </form>

            <p style={styles.signup}>
                Don't have an account? <Link to="/register">Create Account</Link>
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
    signup: {
        marginTop: "15px",
        textAlign: "center",
    }
};

export default Login; 