import React from "react";
import "./Cart.css";
import product1 from "../../assets/product1.jpg";
import Quantity from "../Product/components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const Cart = () => {
	const data = [
		{
			id: 1,
			name: "Classic Denim Jacket",
			description:
				"A timeless denim jacket with a relaxed fit, perfect for layering over any outfit.",
			price: 79.99,
			image: product1,
		},
	];
	return (
		<div className="cartpage">
			<div className="left">
				{data.map(d => (
					<div className="cart-product">
						<div className="cartimg">
							<img src={d.image} alt="" />
						</div>
						<div className="cart-right">
							<div>
								<h3 className="cart-prod-name">{d.name}</h3>
								<div className="cart-prod-desc">
									{d.description}
								</div>
								<div className="cart-prod-price">
									${d.price}
								</div>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "20px",
								}}
							>
								<div>
									<Quantity />
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<AiOutlineDelete color="red" />
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
										color: "#2879fe",
									}}
								>
									<FaRegHeart />
									Move to wishlist
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="right">
				<div className="cart-total"></div>
			</div>
		</div>
	);
};

export default Cart;
