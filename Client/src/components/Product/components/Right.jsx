import React from "react";
import Quantity from "./Quantity";
import Rating from "./Rating";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/cartSlice";

const Right = ({ data }) => {
	const dispatch = useDispatch();
	return (
		<div className="right">
			<h2>{data.attributes.product_name}</h2>
			<div style={{ color: "gray" }}>
				{data.attributes.product_description}
			</div>
			<div className="rating">
				<Rating rating={data.attributes.product_rating} />
				{data.attributes.product_rating}
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
						${data.attributes.product_price + 60}
					</div>
					<div className="current-price">
						${data.attributes.product_price}
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
						dispatch(
							addToCart({
								id: data.id,
								name: data.attributes.product_name,
								price: data.attributes.product_price,
								description:
									data.attributes.product_description,
								image: data.attributes.product_image.data
									.attributes.url,
							})
						)
					}
				>
					<FiShoppingCart /> Add to cart
				</button>
			</div>
			<div className="addtowishlist">
				<FaRegHeart /> Add to wishlist
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
