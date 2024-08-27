import React from "react";
import "./Cart.css";
import product1 from "../../assets/product1.jpg";
import Quantity from "../Product/components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../Redux/cartSlice";

const Cart = () => {
	const products = useSelector(state => state.cart.products);
	const dispatch = useDispatch();

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
										dispatch(removeProduct(d.id))
									}
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
