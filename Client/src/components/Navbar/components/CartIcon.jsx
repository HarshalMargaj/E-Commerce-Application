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
import zIndex from "@mui/material/styles/zIndex";

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

	const subtotal = () => {
		let sum = 0;
		products?.forEach(element => {
			sum += element.price;
		});
		return sum;
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
					{products?.map(d => (
						<div
							className="border-y flex items-center p-5"
							key={d.id}
						>
							<div className="w-[30%]">
								<img
									src={
										import.meta.env.VITE_UPLOAD_URL +
										d.image
									}
									alt=""
									className="w-[100px] h-[100px]"
								/>
							</div>
							<div className="flex flex-col gap-[10px] w-[70%]">
								<div>
									<h3>{d.name}</h3>
									<div className="text-gray-400">
										{d.description}
									</div>
									<div>${d.price}</div>
								</div>
								<div className="flex items-center gap-5">
									<div>
										<Quantity />
									</div>
									<div
										className="flex items-center"
										onClick={() =>
											deleteCartItem(d.id, jwt, dispatch)
										}
									>
										<AiOutlineDelete color="red" />
									</div>
									<div className="flex items-center gap-[10px] text-[#2879fe]">
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
