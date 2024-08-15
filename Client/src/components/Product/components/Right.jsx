import React from "react";
import Quantity from "./Quantity";
import Rating from "./Rating";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

const Right = () => {
	return (
		<div className="right">
			<h2>product name</h2>
			<div>
				<Rating />
			</div>
			<div>$50</div>
			<div style={{ color: "gray" }}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
				repellendus aspernatur minus distinctio id facilis
				exercitationem inventore fuga nesciunt laboriosam culpa odit
				totam placeat deserunt ullam, sit minima vitae tenetur.
			</div>
			<div>
				<Quantity />
			</div>
			<div className="addtocartbutton">
				<button>
					<FiShoppingCart /> Add to cart
				</button>
			</div>
			<div className="addtowishlist">
				<FaRegHeart /> Add to wishlist
			</div>
			<div className="about">
				<div>Vender : Polo</div>
				<div>Type: T-Shirt</div>
				<div>Tag: T-Shirt, Men, Gym</div>
			</div>
		</div>
	);
};

export default Right;
