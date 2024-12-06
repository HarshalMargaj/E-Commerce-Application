import React from "react";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import "./Wshlist.css";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addProdToCart, deleteWishlistProd } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
	const wishlists = useSelector(state => state.cart.wishlists);
	const user = useSelector(state => state.user.user);
	const jwt = sessionStorage.getItem("jwt");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div>
			<div
				style={{
					padding: "40px 60px",
					paddingBottom: "0",
					color: "dimgray",
				}}
			>
				<span
					style={{
						fontSize: "24px",
						fontWeight: "500",
						color: "black",
					}}
				>
					My Wishlist
				</span>{" "}
				{wishlists.length} items
			</div>
			<div className="wishlist-container">
				{wishlists.map(item => (
					<div className="wishlist-card" key={item.id}>
						<div>
							<img
								src={
									import.meta.env.VITE_UPLOAD_URL +
									item.product_image
								}
								alt=""
								width={300}
								height={300}
							/>
						</div>
						<div>{item.product_name}</div>
						<div
							className="price"
							style={{ display: "flex", alignItems: "baseline" }}
						>
							<div className="current-price">
								${item.product_price}
								<small
									style={{
										fontSize: "14px",
										color: "dimgray",
									}}
								>
									M.R.P
								</small>
							</div>
							<div className="old-price">
								${item.product_price + 60}
							</div>
							<span>(20% off)</span>
						</div>
						<div className="addtocartbutton">
							<button
								onClick={() =>
									addProdToCart(
										jwt,
										user.id,
										item.id,
										navigate,
										dispatch
									)
								}
							>
								<FiShoppingCart /> Move to cart
							</button>
						</div>
						<div
							className="closeicon"
							onClick={() =>
								deleteWishlistProd(item.id, jwt, dispatch)
							}
						>
							<IoIosCloseCircle color="#eeeef2" size={25} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Wishlist;
