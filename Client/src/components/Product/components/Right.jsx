import React from "react";
import Quantity from "./Quantity";
import Rating from "./Rating";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlist, removeWishlist } from "../../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { addProdToCart } from "../../../api/api";

const Right = ({ product }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const jwt = sessionStorage.getItem("jwt");
	const user = JSON.parse(sessionStorage.getItem("user"));

	return (
		<div className="right">
			<h2>{product.attributes.product_name}</h2>
			<div style={{ color: "gray" }}>
				{product.attributes.product_description}
			</div>
			<div className="rating">
				<Rating rating={product.attributes.product_rating} />
				{product.attributes.product_rating}
			</div>
			<div className="price">
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						gap: "10px",
					}}
				>
					<div className="old-price">
						${product.attributes.product_price + 60}
					</div>
					<div className="current-price">
						${product.attributes.product_price}
					</div>
				</div>
				<div className="discount">20% Off!</div>
			</div>

			<div>
				<Quantity />
			</div>
			<div className="addtocartbutton">
				<button
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
				className="addtowishlist"
				onClick={() =>
					dispatch(
						addToWishlist({
							id: product.id,
							product_name: product.attributes.product_name,
							product_price: product.attributes.product_price,
							product_description:
								product.attributes.product_description,
							product_image:
								product.attributes.product_image.data.attributes
									.url,
						})
					)
				}
			>
				<FaRegHeart /> Add to wishlist
			</div>
			<div onClick={() => dispatch(removeWishlist(product.id))}>
				remove
			</div>
			<div className="about">
				<div>Vender : Polo</div>
				<div>Type: T-Shirt</div>
				<div>Tag: T-Shirt, Men, Gym</div>
			</div>
		</div>
	);
};

export default Right;
