import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import CartIcon from "./components/CartIcon";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "../Home/components/Categories";
import { FaRegHeart } from "react-icons/fa";
import "./Nabar.css";
import { resetCart } from "../../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
	const loginuser = useSelector(state => state.user.user);
	const isLogin = sessionStorage.getItem("jwt") ? true : false;
	const dispatch = useDispatch();

	const categoryDropdownContent = (
		<div className="categoryDropdownContent">
			<Categories />
		</div>
	);

	const logout = () => {
		sessionStorage.clear();
		dispatch(logoutUser());
		dispatch(resetCart());
	};

	const profileDropdown = (
		<div style={{ background: "white", padding: "10px" }}>
			<div onClick={logout}>Log out</div>
		</div>
	);

	return (
		<div className="header">
			<div className="brand-name">
				<Link to={"/"} className="icon">
					<div>ShopVista</div>
				</Link>
				<Tippy
					content={categoryDropdownContent}
					interactive={true}
					placement="bottom"
					offset={[-100, 40]}
				>
					<div className="categories">
						Categories <MdKeyboardArrowDown />
					</div>
				</Tippy>
			</div>
			<div className="searchbar">
				<FaSearch />
				<input type="text" placeholder="Search products" />
			</div>
			<div className="menus">
				<Link to={"/wishlist"} className="l">
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
						<div>Hi, {loginuser && loginuser?.username}</div>
					</Tippy>
				)}
			</div>
		</div>
	);
};

export default Navbar;
