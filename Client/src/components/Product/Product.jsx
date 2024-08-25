import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import "./Product.css";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Product = ({ cartItemsLength }) => {
	const pId = useParams().id;
	const { data, isLoading, error } = useFetch(`/products/${pId}?populate=*`);

	if (isLoading) {
		return <div>Loading...</div>; // Display a loading spinner or message
	}

	if (error) {
		return (
			<div>Error loading product details. Please try again later.</div>
		);
	}

	// Check if data is available before rendering the components
	if (!data || !data.attributes) {
		return <div>No product details available.</div>;
	}

	console.log(data);

	return (
		<div className="productdetail" style={{ display: "flex" }}>
			<div className="left">
				<Left data={data} />
			</div>
			<div className="right">
				<Right data={data} />
			</div>
		</div>
	);
};

export default Product;
