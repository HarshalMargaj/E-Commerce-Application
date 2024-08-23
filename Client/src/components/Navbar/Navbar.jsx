import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import CartIcon from "./components/CartIcon";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import "./Nabar.css";

const Navbar = ({ cartItemsLength }) => {
	const categoryDropdownContent = (
		<div className="categoryDropdownContent">
			<div>categories men women children</div>
		</div>
	);

	return (
		<div className="header">
			<div className="brand-name">
				<Link to={"/"} className="icon">
					<div>TrendTreasure</div>
				</Link>
				<Tippy
					content={categoryDropdownContent}
					interactive={true}
					placement="bottom-start"
				>
					<Link to={"/"} className="l">
						<div className="categories">
							Categories <MdKeyboardArrowDown />
						</div>
					</Link>
				</Tippy>
			</div>
			<div className="searchbar">
				<FaSearch />
				<input type="text" placeholder="Search products" />
			</div>
			<div className="menus">
				<Link to={"/"} className="l">
					<div>Home</div>
				</Link>
				<Link to={"/about"} className="l">
					<div>About</div>
				</Link>
				<Link to={"/products/:id"} className="l">
					<div>Products</div>
				</Link>
				<Link to={"/contact"} className="l">
					<div>Contact</div>
				</Link>

				<CartIcon cartItemsLength={cartItemsLength} />
			</div>
		</div>
	);
};

export default Navbar;
