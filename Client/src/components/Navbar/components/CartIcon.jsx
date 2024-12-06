import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import Quantity from "../../Product/components/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../../api/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}));

export default function CustomizedBadges() {
	const products = useSelector(state => state.cart.products);
	const jwt = sessionStorage.getItem("jwt");
	console.log("cart products", products);
	const dispatch = useDispatch();

	const subtotal = () => {
		let sum = 0;
		products?.forEach(element => {
			sum += element.price;
		});
		return sum;
	};

	const cartDropdownContent = (
		<div className="cartDropdownContent">
			<div
				style={{
					textAlign: "center",
					display: "flex",
					justifyContent: "center",
					alignItems: "baseline",
					gap: "10px",
				}}
			>
				<div>Subtotal </div>
				<div style={{ color: "crimson", fontSize: "20px" }}>
					${subtotal()}
				</div>
			</div>
			<div className="gotocartbutton">
				<Link to={"/cart"} style={{ width: "100%" }}>
					<button className="gotocart">Go to cart</button>
				</Link>
			</div>
			<div className="scroll">
				<div className="left">
					{products?.map(d => (
						<div className="cart-product" key={d.id}>
							<div className="cartimg">
								<img
									src={
										import.meta.env.VITE_UPLOAD_URL +
										d.image
									}
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
			</div>
		</div>
	);
	return (
		<Tippy
			content={cartDropdownContent}
			interactive={true}
			placement="bottom-start"
			trigger="click"
			offset={[-150, 10]}
		>
			<IconButton aria-label="cart">
				<StyledBadge
					badgeContent={products?.length ? products?.length : "0"}
					color="secondary"
				>
					<ShoppingCartIcon />
				</StyledBadge>
			</IconButton>
		</Tippy>
	);
}
