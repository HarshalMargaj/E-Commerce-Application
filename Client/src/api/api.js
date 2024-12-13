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
	dispatch,
	setIsLoading
) => {
	if (!jwt) {
		navigate("/login");
		return;
	}

	try {
		setIsLoading(true);
		const existingCartResponse = await axios.get(
			`${
				import.meta.env.VITE_API_URL
			}/carts?[filters][user_id][$eq]=${userId}&[populate][products][populate]=*`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		const carts = existingCartResponse.data.data;

		const allProducts = carts
			.flatMap(cart => cart.attributes.products.data)
			.map(product => product.id);

		if (allProducts.includes(prodId)) {
			toast.error("Product is already in the cart.");
			return;
		}

		const data = {
			data: {
				user_id: userId,
				user: userId,
				products: prodId,
			},
		};

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
				product_id: Cartdata.id,
				name: Cartdata.attributes.product_name,
				price: Cartdata.attributes.product_price,
				description: Cartdata.attributes.product_description,
				image: Cartdata.attributes.product_image.data.attributes.url,
			})
		);
		setIsLoading(false);
		toast.success("Item added to cart successfully.");
	} catch (error) {
		setIsLoading(false);
		console.error("Error details:", error.response?.data || error.message);
		toast.error("Failed to add item to cart. Please try again.");
	}
};

export const deleteCartItem = async (
	id,
	jwt,
	dispatch,
	setProductLoadingState
) => {
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
		setProductLoadingState(false);
		toast.success("Item removed from cart.");
	} catch (error) {
		setProductLoadingState(false);
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

export const addProdToWishlist = async (
	userId,
	productId,
	jwt,
	dispatch,
	setProductLoadingState
) => {
	try {
		const existingWishlistResponse = await axios.get(
			`${
				import.meta.env.VITE_API_URL
			}/wishlists?filters[user_id][$eq]=${userId}&populate[products][populate]=*`,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		const wishlists = existingWishlistResponse.data.data;

		const allProducts = wishlists
			.flatMap(wishlist => wishlist.attributes.products.data)
			.map(product => product.id);

		if (allProducts.includes(productId)) {
			toast.error("Product is already in the wishlist.");
			return;
		}

		const data = {
			data: {
				products: productId,
				users_permissions_user: userId,
				user_id: userId,
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
				product_id: wishlistData.id,
				product_name: wishlistData.attributes.product_name,
				product_price: wishlistData.attributes.product_price,
				product_description:
					wishlistData.attributes.product_description,
				product_image:
					wishlistData.attributes.product_image.data.attributes.url,
			})
		);
		setProductLoadingState(false);
		toast.success("Item added to wishlist successfully.");
	} catch (error) {
		setProductLoadingState(false);
		console.error("Error details:", error.response?.data || error.message);
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
				wishlist.attributes.products.data.map(product => ({
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
