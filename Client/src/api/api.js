import axios from "axios";
import {
	addToCart,
	addToWishlist,
	removeProduct,
	removeWishlist,
} from "../Redux/cartSlice";
import toast from "react-hot-toast";

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
		toast.success("Item added to cart successfully.");
	} catch (error) {
		toast.error("Failed to add item to cart. Please try again.");
	}
};

export const deleteCartItem = async (id, jwt, dispatch) => {
	try {
		if (!id) {
			throw new Error("Cart item ID is required");
		}
		const response = await axios.delete(
			`${import.meta.env.VITE_API_URL}/carts/${id}`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		dispatch(removeProduct(id));
		toast.success("Item removed from cart.");
	} catch (error) {
		toast.error("Failed to remove item from cart. Please try again.");
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

		const userCarts = response.data.data;

		if (userCarts.length > 0) {
			const products = userCarts.flatMap(cart =>
				cart.attributes.products.data.map(product => ({
					id: cart.id,
					name: product.attributes.product_name,
					price: product.attributes.product_price,
					description: product.attributes.product_description,
					image: product.attributes.product_image.data.attributes.url,
				}))
			);

			products.forEach(product => {
				dispatch(addToCart(product));
			});
		}
	} catch (error) {
		console.error("Error fetching user cart:", error);
	}
};

export const addProdToWishlist = async (userId, productId, jwt, dispatch) => {
	try {
		const data = {
			data: {
				products: productId,
				users_permissions_user: userId,
			},
		};
		const response = await axios.post(
			`${
				import.meta.env.VITE_API_URL
			}/wishlists?[populate][products][populate]=*`,
			data,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		const wishlistId = response.data.data.id;
		const wishlistData = response.data.data.attributes.products.data[0];

		dispatch(
			addToWishlist({
				id: wishlistId,
				product_name: wishlistData.attributes.product_name,
				product_price: wishlistData.attributes.product_price,
				product_description:
					wishlistData.attributes.product_description,
				product_image:
					wishlistData.attributes.product_image.data.attributes.url,
			})
		);
		toast.success("Item added to wishlist successfully.");
	} catch (error) {
		toast.error("Failed to add item to wishlist. Please try again.");
	}
};

export const deleteWishlistProd = async (id, jwt, dispatch) => {
	try {
		if (!id) {
			throw new Error("Cart item ID is required");
		}
		const response = await axios.delete(
			`${import.meta.env.VITE_API_URL}/wishlists/${id}`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		dispatch(removeWishlist(id));
		toast.success("Item removed from wishlist.");
	} catch (error) {
		toast.error("Failed to remove item from wishlist. Please try again.");
	}
};

export const fetchUserWishlist = async (userId, jwt, dispatch) => {
	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_API_URL
			}/wishlists?filters[user_id][$eq]=${userId}&populate[products][populate]=*`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		const userWishlists = response.data.data;

		if (userWishlists.length > 0) {
			const products = userWishlists.flatMap(wishlist =>
				cart.attributes.products.data.map(product => ({
					id: wishlist.id,
					product_name: product.attributes.product_name,
					product_price: product.attributes.product_price,
					product_description: product.attributes.product_description,
					product_image:
						product.attributes.product_image.data.attributes.url,
				}))
			);

			products.forEach(product => {
				dispatch(addToWishlist(product));
			});
		}
	} catch (error) {
		console.error("Error fetching user cart:", error);
	}
};

export const allProducts = async jwt => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/products?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
