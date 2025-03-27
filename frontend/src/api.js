import axios from "axios";

const API_URL = "http://localhost:3000/api/notes"; // Updated URL with /api prefix

// Get auth token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
};

export const getNotes = () => axios.get(API_URL, getAuthHeader());
export const getNoteById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createNote = (note) => axios.post(API_URL, note, getAuthHeader());
export const updateNote = (id, note) => axios.put(`${API_URL}/${id}`, note, getAuthHeader());
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeader());
