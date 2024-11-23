import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance"; // Use axiosInstance for making API calls

// Async Thunks for login, logout, and refresh token
export const login = createAsyncThunk("auth/login", async (credentials) => {
    const response = await axiosInstance.post("/auth", credentials);
    return response.data; // The response should have the token property
});


// Create a slice to handle authentication state
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null, // Track the authentication token here
        error: null, // Store errors (if any) here
    },
    reducers: {
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload; // Set the accessToken directly
            state.token = accessToken;
        },
        clearAccessToken: (state) => {
            state.token = null; // Clear the token
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.accessToken; // Save access token after login
                localStorage.setItem("accessToken", action.payload.accessToken); 
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message; // Save error if login fails
            })
    },
});

export const authReducer = authSlice.reducer;

export const { setAccessToken, clearAccessToken } = authSlice.actions;
