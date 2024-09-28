import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Rating from "../Product/components/Rating";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../../Redux/cartSlice";
import { useDispatch } from "react-redux";

const Card = ({ product }) => {
	const dispatch = useDispatch();
	return (
		<div>
			<Link to={`/product/${product.id}`} className="link">
				<div className="card">
					<img
						src={
							import.meta.env.VITE_UPLOAD_URL +
							product?.attributes?.product_image?.data?.attributes
								?.url
						}
						alt=""
						width={300}
						height={300}
					/>
					<h3 style={{ color: "dimgray", fontWeight: "500" }}>
						{product.attributes.product_name}
					</h3>
					<p>{product.attributes.product_description}</p>
					<Rating rating={product.attributes.product_rating} />
					<div>
						{product.attributes.isLimitedTimeDeal ? (
							<div className="deal">Limited Time Deal</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						className="price"
						style={{ display: "flex", alignItems: "baseline" }}
					>
						<div className="current-price">
							${product.attributes.product_price}
							<small
								style={{ fontSize: "14px", color: "dimgray" }}
							>
								M.R.P
							</small>
						</div>
						<div className="old-price">
							${product.attributes.product_price + 60}
						</div>
						<span>(20% off)</span>
					</div>
				</div>
			</Link>
			<div className="addtocartbutton">
				<button
					onClick={() =>
						dispatch(
							addToCart({
								id: product.id,
								name: product.attributes.product_name,
								price: product.attributes.product_price,
								description:
									product.attributes.product_description,
								image: product.attributes.product_image.data
									.attributes.url,
							})
						)
					}
				>
					<FiShoppingCart /> Add to cart
				</button>
			</div>
		</div>
	);
};

export default Card;
