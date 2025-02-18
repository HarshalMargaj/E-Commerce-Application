import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../Loaders/Loader";

const Product = () => {
	const pId = useParams().id;
	const { data, isLoading, error } = useFetch(`/products/${pId}?populate=*`);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-[90vh]">
				<Loader />
			</div>
		);
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
		<div className="flex-col w-full md:px-[60px] mt-[60px] md:flex-row flex">
			<div className="md:w-[40%] w-full">
				<Left data={data} />
			</div>
			<div className="  md:w-[60%] w-full">
				<Right product={data} />
			</div>
		</div>
	);
};

export default Product;
