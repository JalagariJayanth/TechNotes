// Selectors for notes slice

// Select all notes
export const selectAllNotes = (state) => state.notes.data;

// Select a specific note by ID
export const selectNoteById = (state, noteId) =>
    state.notes.data.find((note) => note._id === noteId);

// Select the loading state of notes
export const selectNotesLoading = (state) => state.notes.loading;

// Select the error state of notes
export const selectNotesError = (state) => state.notes.error;
  
// Add note operation status
export const selectAddNoteStatus = (state) => {
    if (state.notes.loading) return "pending"; // Operation in progress
    if (state.notes.error) return "failed";    // Operation failed
    return "idle";                             // No ongoing operation
};

// Update note operation status
export const selectUpdateNoteStatus = (state) => {
    if (state.notes.loading) return "pending"; // Operation in progress
    if (state.notes.error) return "failed";    // Operation failed
    return "idle";                             // No ongoing operation
};

// Delete note operation status
export const selectDeleteNoteStatus = (state) => {
    if (state.notes.loading) return "pending"; // Operation in progress
    if (state.notes.error) return "failed";    // Operation failed
    return "idle";                             // No ongoing operation
};
