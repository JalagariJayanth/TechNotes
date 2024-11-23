// Selectors for users slice

// Select all users
export const selectAllUsers = (state) => {
    console.log(state)
   return state.users.data;
}

// Select a specific user by ID
export const selectUserById = (state, userId) =>
    state.users.data.find((user) => user._id === userId);

// Select the loading state of users
export const selectUsersLoading = (state) => state.users.loading;

// Select the error state of users
export const selectUsersError = (state) => state.users.error;

// Add operation status
export const selectAddUserStatus = (state) => {
    if (state.users.loading) return "pending"; // Operation in progress
    if (state.users.error) return "failed";    // Operation failed
    return "idle";                             // No ongoing operation
};

// Update operation status
export const selectUpdateUserStatus = (state) => {
    if (state.users.loading) return "pending"; // Operation in progress
    if (state.users.error) return "failed";    // Operation failed
    return "idle";                             // No ongoing operation
};

// Delete operation status
export const selectDeleteUserStatus = (state) => {
    if (state.users.loading) return "pending"; // Operation in progress
    if (state.users.error) return "failed";    // Operation failed
    return "idle";                             // No ongoing operation
};