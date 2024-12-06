import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import CartIcon from "./components/CartIcon";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "../Home/components/Categories";
import { FaRegHeart } from "react-icons/fa";
import { resetCart } from "../../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
	const loginuser = useSelector(state => state.user.user);
	const isLogin = sessionStorage.getItem("jwt") ? true : false;
	const dispatch = useDispatch();

	const categoryDropdownContent = (
		<div className="bg-white shadow-md w-[1300px] rounded-md p-2">
			<Categories />
		</div>
	);

	const logout = () => {
		sessionStorage.clear();
		dispatch(logoutUser());
		dispatch(resetCart());
	};

	const profileDropdown = (
		<div className="bg-white rounded-md shadow-lg p-2">
			<div onClick={logout} className="cursor-pointer">
				Log out
			</div>
		</div>
	);

	return (
		<div className="flex justify-between h-[75px] items-center border-b py-2 px-8">
			<div className="flex items-center gap-5">
				<Link to={"/"} className="text-[32px] text-[#2879fe]">
					<div>ShopVista</div>
				</Link>
				<Tippy
					content={categoryDropdownContent}
					interactive={true}
					placement="bottom"
					offset={[-100, 40]}
				>
					<div className="flex items-center gap-[5px] cursor-pointer">
						Categories <MdKeyboardArrowDown />
					</div>
				</Tippy>
			</div>
			<div className="w-[40%] border flex gap-[10px] p-2 items-center rounded-lg">
				<FaSearch />
				<input
					type="text"
					placeholder="Search products"
					className="w-full border-none outline-none mb-0"
				/>
			</div>
			<div className="flex items-center gap-5">
				<Link to={"/wishlist"} className="text-black">
					<FaRegHeart />
				</Link>

				<CartIcon />

				{!isLogin ? (
					<Link to={"/login"}>
						<button>Login</button>
					</Link>
				) : (
					<Tippy
						content={profileDropdown}
						interactive={true}
						placement="bottom"
						trigger="click"
					>
						<div className="cursor-pointer">
							Hi, {loginuser && loginuser?.username}
						</div>
					</Tippy>
				)}
			</div>
		</div>
	);
};

export default Navbar;
