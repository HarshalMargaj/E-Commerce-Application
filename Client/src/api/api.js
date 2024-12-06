import axios from "axios";
import { addToCart, removeProduct } from "../Redux/cartSlice";

export const addProdToCart = async (
	jwt,
	userId,
	prodId,
	navigate,
	dispatch
) => {
	if (!jwt) {
		navigate("/login");
		return;
	}

	const data = {
		data: {
			user_id: userId,
			user: userId,
			products: prodId,
		},
	};

	try {
		const response = await axios.post(
			`${
				import.meta.env.VITE_API_URL
			}/carts?[populate][products][populate]=*`,
			data,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		console.log(response.data.data.id);
		const cartId = response.data.data.id;
		const Cartdata = response.data.data.attributes.products.data[0];
		dispatch(
			addToCart({
				id: cartId,
				name: Cartdata.attributes.product_name,
				price: Cartdata.attributes.product_price,
				description: Cartdata.attributes.product_description,
				image: Cartdata.attributes.product_image.data.attributes.url,
			})
		);
	} catch (error) {
		console.log(error);
	}
};

export const deleteCartItem = async (id, jwt, dispatch) => {
	try {
		// Ensure ID is valid
		if (!id) {
			throw new Error("Cart item ID is required");
		}

		// Make DELETE request to Strapi API
		const response = await axios.delete(
			`${import.meta.env.VITE_API_URL}/carts/${id}`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`, // Ensure jwt is valid
				},
			}
		);

		console.log("Deleted cart item:", response.data);

		// Update state by dispatching Redux action
		dispatch(removeProduct(id));
	} catch (error) {
		// Log detailed error
		if (error.response) {
			console.log("Error response:", error.response.data);
		} else {
			console.log("Error:", error.message);
		}
	}
};

export const fetchUserCart = async (userId, jwt, dispatch) => {
	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_API_URL
			}/carts?filters[user_id][$eq]=${userId}&populate[products][populate]=*`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		// Extract all carts for the user
		const userCarts = response.data.data;

		if (userCarts.length > 0) {
			// Flatten and format the products from all carts
			const products = userCarts.flatMap(cart =>
				cart.attributes.products.data.map(product => ({
					id: cart.id, // Product ID
					name: product.attributes.product_name,
					price: product.attributes.product_price,
					description: product.attributes.product_description,
					image: product.attributes.product_image.data.attributes.url,
				}))
			);

			// Add each product individually to Redux state
			products.forEach(product => {
				dispatch(addToCart(product)); // Dispatch product one at a time
			});
		}
	} catch (error) {
		console.error("Error fetching user cart:", error);
	}
};
