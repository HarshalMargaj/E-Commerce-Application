import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import "./Product.css";

const Product = ({ cartItemsLength }) => {
	console.log(cartItemsLength);
	return (
		<div className="productdetail" style={{ display: "flex" }}>
			<div className="left">
				<Left />
			</div>
			<div className="right">
				<Right />
			</div>
		</div>
	);
};

export default Product;
