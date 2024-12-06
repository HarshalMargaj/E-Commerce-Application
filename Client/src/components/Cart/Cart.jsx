import React from "react";
import "./Cart.css";
import Quantity from "../Product/components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../api/api";

const Cart = () => {
	const products = useSelector(state => state.cart.products);
	const dispatch = useDispatch();
	const jwt = sessionStorage.getItem("jwt");

	const subtotal = () => {
		let sum = 0;
		products.forEach(element => {
			console.log(element.product_price);
			sum += element.price;
		});
		return sum;
	};

	const discount = () => products.length * 60;

	return (
		<div className="cartpage">
			<div className="left">
				{products.map(d => (
					<div className="cart-product" key={d.id}>
						<div className="cartimg">
							<img
								src={import.meta.env.VITE_UPLOAD_URL + d.image}
								alt=""
							/>
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
									onClick={() =>
										deleteCartItem(d.id, jwt, dispatch)
									}
								>
									<AiOutlineDelete color="red" /> delete me
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
				<div className="cart-total">
					<div>
						<div className="payment">Payment</div>
						<div className="subtotal">
							Subtotal item({products.length})
							<div>${subtotal() + products.length * 60}</div>
						</div>
						<div className="cart-discount">
							Discount
							<div>-${discount()}</div>
						</div>
						<div className="subtotal">
							Total
							<div>${subtotal()}</div>
						</div>
						<div
							className="gotocartbutton"
							style={{ padding: "10px 12px" }}
						>
							<button className="gotocart">Proceed to buy</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
