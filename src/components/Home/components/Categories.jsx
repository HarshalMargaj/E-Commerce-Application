import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
	return (
		<div className="categories-sec">
			<div>
				<Link to="/products/1">Men</Link>
			</div>
			<div>
				<Link to="/products/2">Women</Link>
			</div>
			<div>
				<Link to="/products/3">Children</Link>
			</div>
			<div>
				<Link to="/products/4">Mobiles</Link>
			</div>
			<div>
				<Link to="/products/5">Laptops</Link>
			</div>
			<div>
				<Link to="/products/6">Books</Link>
			</div>
			<div>
				<Link to="/products/7">Shoes</Link>
			</div>
		</div>
	);
};

export default Categories;
