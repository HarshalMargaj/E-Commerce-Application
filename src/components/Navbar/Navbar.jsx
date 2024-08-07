import React from "react";
import { Link } from "react-router-dom";
import "./Nabar.css";
import CartIcon from "./components/CartIcon";
import Logo from "../../assets/logo.png";
import Logo2 from "../../assets/logo2.png";

const Navbar = () => {
	return (
		<div className="header">
			<div>
				<Link to={"/"} className="icon">
					<img src={Logo} alt="" width={200} />
				</Link>
			</div>
			<div className="menus">
				<Link to={"/"} className="l">
					<div>Home</div>
				</Link>
				<Link to={"/about"} className="l">
					<div>About</div>
				</Link>
				<Link to={"/products"} className="l">
					<div>Products</div>
				</Link>
				<Link to={"/contact"} className="l">
					<div>Contact</div>
				</Link>
				<Link to={"/cart"} className="l">
					<CartIcon />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
