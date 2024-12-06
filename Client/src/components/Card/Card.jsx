import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Product/components/Rating";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addProdToCart } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const jwt = sessionStorage.getItem("jwt");
	const user = JSON.parse(sessionStorage.getItem("user"));

	return (
		<div>
			<Link to={`/product/${product.id}`}>
				<div className="flex flex-col gap-2 text-gray-400 w-[300px]">
					<img
						src={
							import.meta.env.VITE_UPLOAD_URL +
							product?.attributes?.product_image?.data?.attributes
								?.url
						}
						alt=""
						className="w-[300px] h-[300px]"
					/>
					<h3 className="text-gray-400 font-medium">
						{product.attributes.product_name}
					</h3>
					<p>{product.attributes.product_description}</p>
					<Rating rating={product.attributes.product_rating} />
					<div>
						{product.attributes.isLimitedTimeDeal ? (
							<div className="bg-red-500 text-white font-medium w-1/2 rounded p-1 text-sm text-center">
								Limited Time Deal
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div className="flex items-baseline gap-2">
						<div className="font-medium text-[#2879fe] text-2xl">
							${product.attributes.product_price}
							<small className="text-sm text-gray-400">
								M.R.P
							</small>
						</div>
						<div className="text-gray-400">
							${product.attributes.product_price + 60}
						</div>
						<span>(20% off)</span>
					</div>
				</div>
			</Link>
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
		</div>
	);
};

export default Card;
