import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		token: null,
	},
	reducers: {
		setLoggedInUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},

		logoutUser: state => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setLoggedInUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
