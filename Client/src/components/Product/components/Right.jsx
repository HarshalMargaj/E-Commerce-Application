import React from "react";
import Rating from "./Rating";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProdToCart, addProdToWishlist } from "../../../api/api";

const Right = ({ product }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const jwt = sessionStorage.getItem("jwt");
	const user = JSON.parse(sessionStorage.getItem("user"));
	console.log(product);

	return (
		<div className="p-5 flex flex-col gap-5 ">
			<h2 className="text-4xl text-gray-700">
				{product.attributes.product_name}
			</h2>
			<div className="text-gray-500">
				{product.attributes.product_description}
			</div>
			<div className="flex gap-1">
				<Rating rating={product.attributes.product_rating} />
				{product.attributes.product_rating}
			</div>
			<div className="flex gap-2 items-center">
				<div className="flex items-baseline gap-2">
					<div className="text-gray-400">
						${product.attributes.product_price + 60}
					</div>
					<div className="font-medium text-[#2879fe] text-2xl">
						${product.attributes.product_price}
					</div>
				</div>
				<div className="bg-red-500 py-1 px-3 w-[100px] rounded-md font-medium text-white flex justify-center">
					20% Off!
				</div>
			</div>

			<div>
				<button
					className="bg-[#2879fe] text-white w-[200px] border-none py-2 px-3 rounded-md gap-1 flex items-center justify-center"
					onClick={() =>
						addProdToCart(
							jwt,
							user.id,
							product.id,
							navigate,
							dispatch
						)
					}
				>
					<FiShoppingCart /> Add to cart
				</button>
			</div>
			<div
				className="text-[#2879fe] flex items-center gap-2 cursor-pointer"
				onClick={() =>
					addProdToWishlist(user.id, product.id, jwt, dispatch)
				}
			>
				<FaRegHeart /> Add to wishlist
			</div>
			<div className="text-gray-400">
				<div>Vender : Polo</div>
				<div>Type: T-Shirt</div>
				<div>Tag: T-Shirt, Men, Gym</div>
			</div>
		</div>
	);
};

export default Right;
