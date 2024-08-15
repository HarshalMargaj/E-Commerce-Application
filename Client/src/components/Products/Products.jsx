import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import "./Products.css";

const Products = () => {
	const catId = useParams();
	console.log(catId);
	return (
		<div className="category-products">
			<div className="left">
				<Left />
			</div>
			<div className="right">
				<Right catId={catId} />
			</div>
		</div>
	);
};

export default Products;
