import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../interfaces/interface';
import { RootState } from '../store';

const initialState: AuthState = {
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoggedIn: (state) => {
			state.isLoggedIn = true;
		},
		setLoggedOut: (state) => {
			state.isLoggedIn = false;
		},
	},
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice;
