import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

import CartIcon from "./components/CartIcon";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "../Home/components/Categories";

import "./Nabar.css";

const Navbar = ({ cartItemsLength }) => {
	const categoryDropdownContent = (
		<div className="categoryDropdownContent">
			<Categories />
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
				<Link to={"/"} className="l">
					<div>Home</div>
				</Link>
				<Link to={"/about"} className="l">
					<div>About</div>
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
