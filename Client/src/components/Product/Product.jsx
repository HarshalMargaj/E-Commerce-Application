import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Product = ({ cartItemsLength }) => {
	const pId = useParams().id;
	const { data, isLoading, error } = useFetch(`/products/${pId}?populate=*`);

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
		<div className="flex w-full px-[60px] mt-[60px]">
			<div className="flex  gap-4 w-[40%]">
				<Left data={data} />
			</div>
			<div className=" gap-5 flex flex-col w-[60%]">
				<Right product={data} />
			</div>
		</div>
	);
};

export default Product;
