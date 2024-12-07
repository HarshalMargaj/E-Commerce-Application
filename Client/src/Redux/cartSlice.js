import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		wishlists: [],
	},
	reducers: {
		addToCart: (state, action) => {
			const item = state.products.find(
				item => item.id === action.payload.id
			);
			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.products.push(action.payload);
			}
		},
		removeProduct: (state, action) => {
			state.products = state.products.filter(
				item => item.id !== action.payload
			);
		},
		resetCart: state => {
			state.products = [];
		},

		addToWishlist: (state, action) => {
			const item = state.wishlists.find(
				item => item.id === action.payload.id
			);
			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.wishlists.push(action.payload);
			}
		},

		removeWishlist: (state, action) => {
			state.wishlists = state.wishlists.filter(
				item => item.id !== action.payload
			);
		},

		resetWishlist: state => {
			state.wishlists = [];
		},
	},
});

export const {
	addToCart,
	removeProduct,
	resetCart,
	addToWishlist,
	removeWishlist,
	resetWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
