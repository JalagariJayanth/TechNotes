import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
});


export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const response = await axiosInstance.post("/users",newUser)
  return response.data;
});


export const updateUser = createAsyncThunk("users/updateUser", async (updatedUser) => {
    const response = await axiosInstance.patch("/users",updatedUser)
    return response.data;
});


export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
    const response = await axiosInstance.delete(`/users/${userId}`)
    return response.data;
});


const usersSlice = createSlice({
    name: "users",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Add user
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload); 
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;  // Update user data
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((user) => user.id !== action.payload); 
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const usersReducer = usersSlice.reducer;


