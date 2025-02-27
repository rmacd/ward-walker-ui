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
            state.isAuthenticated = action.payload;
        },
        setAccessToken(state, action: PayloadAction<string>) {
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
