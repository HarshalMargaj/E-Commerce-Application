import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import CartIcon from "./components/CartIcon";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "../Home/components/Categories";
import { FaRegHeart } from "react-icons/fa";
import {
	SignedIn,
	SignedOut,
	useAuth,
	useUser,
	useClerk,
	UserButton,
} from "@clerk/clerk-react";

import "./Nabar.css";

const Navbar = ({ cartItemsLength }) => {
	const { userId } = useAuth();
	const { user } = useUser();
	const { openSignIn } = useClerk();

	useEffect(() => {
		if (user) {
			console.log("Logged in user ID:", userId);
			console.log("User details:", user.username);
		}
	}, [user, userId]);

	const categoryDropdownContent = (
		<div className="categoryDropdownContent">
			<Categories />
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

				<CartIcon cartItemsLength={cartItemsLength} />

				{user && (
					<div className="welcome_msg">Welcome, {user.username}</div>
				)}
				<SignedOut>
					<button className="signInBtn" onClick={() => openSignIn()}>
						Sign In
					</button>
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default Navbar;
