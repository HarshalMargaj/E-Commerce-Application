import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Product = ({ cartItemsLength }) => {
	const pId = useParams().id;
	const { data, isLoading, error } = useFetch(`/products/${pId}?populate=*`);
	console.log("data from product", data);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<div>Error loading product details. Please try again later.</div>
		);
	}

	if (!data || !data.attributes) {
		return <div>No product details available.</div>;
	}

	return (
		<div className="flex w-full">
			<div className="flex p-5 gap-4 w-[40%]">
				<Left data={data} />
			</div>
			<div className="p-5 gap-5 flex flex-col w-[60%]">
				<Right product={data} />
			</div>
		</div>
	);
};

export default Product;
