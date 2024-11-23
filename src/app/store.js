import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./slices/notesSlice";
import { usersReducer } from "./slices/usersSlice";
import { authReducer } from "./slices/authSlice";


const store = configureStore({
    reducer: {
        auth:authReducer,
        notes: notesReducer, 
        users: usersReducer,
    },
    devTools: false,
});

export default store;



