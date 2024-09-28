import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		wishlists: [],
	},
	reducers: {
		addToCart: (state, action) => {
			// if product already available in products array then dont add it again instead increase quantity
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
	},
});

// Action creators are generated for each case reducer function
export const {
	addToCart,
	removeProduct,
	resetCart,
	addToWishlist,
	removeWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
