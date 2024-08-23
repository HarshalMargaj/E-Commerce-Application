import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import "./Products.css";
import useFetch from "../hooks/useFetch";

const Products = () => {
	const catId = parseInt(useParams().id);
	console.log(catId);
	const { data, isLoading, error } = useFetch(
		`/sub-categories?[filters][categories][id][$eq]=${catId}`
	);
	console.log(data);
	return (
		<div className="category-products">
			<div className="left">
				<Left catId={catId} data={data} />
			</div>
			<div className="right">
				<Right catId={catId} />
			</div>
		</div>
	);
};

export default Products;
