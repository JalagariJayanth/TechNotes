import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const response = await axiosInstance.get("/notes")
    return response.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (newNote) => {
    const response = await axiosInstance.post("/notes",newNote)
    return response.data;
});

export const updateNote = createAsyncThunk("notes/updateNote", async (updatedNote) => {
    const response = await axiosInstance.patch(`/notes/${updatedNote.id}`,updatedNote)
    return response.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId) => {
    const response = await axiosInstance.delete(`/notes/${noteId}`)
    return response.data;
});


const notesSlice = createSlice({
    name: "notes",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch notes
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Add new note
            .addCase(addNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload); // Add the new note to the data array
            })
            .addCase(addNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update note
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((note) => note.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload; // Update the note data
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete note
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((note) => note.id !== action.payload); // Remove the note
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const notesReducer = notesSlice.reducer;



