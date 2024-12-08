import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItem, addProdToWishlist } from "../../../api/api";
import { useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
		zIndex: "-1",
	},
}));

export default function CustomizedBadges() {
	const products = useSelector(state => state.cart.products);
	const jwt = sessionStorage.getItem("jwt");
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.user);

	const [quantities, setQuantities] = useState(
		products.reduce((acc, product) => {
			acc[product.id] = 1; // Default quantity is 1 for each product
			return acc;
		}, {})
	);

	// Function to handle quantity change
	const handleQuantityChange = (id, newQuantity) => {
		setQuantities(prev => ({
			...prev,
			[id]: newQuantity > 0 ? newQuantity : 1, // Prevent negative or zero quantity
		}));
	};

	// Calculate subtotal dynamically
	const subtotal = () => {
		return products.reduce((sum, product) => {
			return sum + product.price * (quantities[product.id] || 1);
		}, 0);
	};

	const cartDropdownContent = (
		<div className="bg-white shadow-md w-[500px] rounded-lg p-[10px] flex flex-col gap-[10px] text-sm">
			<div className="flex items-baseline justify-center text-center gap-[10px]">
				<div>Subtotal </div>
				<div className="text-red-500 text-xl">${subtotal()}</div>
			</div>
			<div className="flex items-center">
				<Link to={"/cart"} className="w-full">
					<button className="bg-[#2879fe] text-white py-2 px-3 border-none rounded-md w-full">
						Go to cart
					</button>
				</Link>
			</div>
			<div className="overflow-y-scroll max-h-[500px]">
				<div className="flex flex-col">
					{products?.map(product => (
						<div
							className="border-y flex items-center p-5"
							key={product.id}
						>
							<div className="w-[30%]">
								<img
									src={
										import.meta.env.VITE_UPLOAD_URL +
										product.image
									}
									alt=""
									className="w-[100px] h-[100px]"
								/>
							</div>
							<div className="flex flex-col gap-[10px] w-[70%]">
								<div>
									<h3>{product.name}</h3>
									<div className="text-gray-400">
										{product.description}
									</div>
									<div className="text-gray-600">
										${product.price} x{" "}
										{quantities[product.id]} ={" "}
										<span className="text-[#2879fe]">
											$
											{product.price *
												quantities[product.id]}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-5">
									<div className="flex items-center gap-2">
										<button
											className="px-2 py-1 bg-gray-200 rounded"
											onClick={() =>
												handleQuantityChange(
													product.id,
													quantities[product.id] - 1
												)
											}
										>
											-
										</button>
										<span>{quantities[product.id]}</span>
										<button
											className="px-2 py-1 bg-gray-200 rounded"
											onClick={() =>
												handleQuantityChange(
													product.id,
													quantities[product.id] + 1
												)
											}
										>
											+
										</button>
									</div>
									<div
										className="flex items-center"
										onClick={() =>
											deleteCartItem(
												product.id,
												jwt,
												dispatch
											)
										}
									>
										<AiOutlineDelete color="red" />
									</div>
									<div
										className="flex items-center gap-[10px] text-[#2879fe] cursor-pointer"
										onClick={() =>
											addProdToWishlist(
												user.id,
												product.product_id,
												jwt,
												dispatch
											)
										}
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
			placement="bottom"
			trigger="click"
			offset={[-100, 10]}
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
