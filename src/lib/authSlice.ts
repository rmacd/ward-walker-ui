// src/store/authSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated(state, action: PayloadAction<boolean>) {
            console.debug("dispatch got authenticated state", action.payload);
            state.isAuthenticated = action.payload;
        },
        setAccessToken(state, action: PayloadAction<string>) {
            console.debug("dispatch got access token", action.payload);
            state.accessToken = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

export const {
    setAuthenticated,
    setAccessToken,
    logout
} = authSlice.actions;
export default authSlice.reducer;
