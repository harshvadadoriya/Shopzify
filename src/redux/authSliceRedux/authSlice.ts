import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../interfaces/interface';
import { RootState } from '../store';
import { string } from 'yup';

const initialState: AuthState = {
	isLoggedIn: false,
	accessToken: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoggedIn: (state, action) => {
			state.isLoggedIn = true;
			state.accessToken = action.payload;
		},
		setLoggedOut: (state) => {
			state.isLoggedIn = false;
			state.accessToken = '';
		},
	},
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const token = (state: RootState) => state.auth.accessToken;

export default authSlice;
