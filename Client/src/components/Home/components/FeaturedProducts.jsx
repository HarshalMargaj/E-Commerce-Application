import React from "react";
import Card from "../../Card/Card";
import useFetch from "../../hooks/useFetch";
import Loader from "../../Loaders/Loader";

const FeaturedProducts = ({ type }) => {
	const { data, isLoading, error } = useFetch(
		`/products?populate=*&[filters][type][$eq]=${type}`
	);

	return (
		<div className="p-[60px] text-sm flex flex-col gap-10">
			<div className="flex">
				<h2 className="w-[40%] text-blue-400 capitalize text-4xl">
					{type} Products
				</h2>
				<p className="text-gray-700">
					Explore our curated selection of top-rated and
					customer-favorite products. These are the must-have items
					that our shoppers can't get enough of! Whether you're
					looking for the latest trends or timeless essentials, our
					featured products offer something special for everyone.
				</p>
			</div>
			<div className="flex gap-5 justify-between">
				{data.map(product => (
					<Card product={product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;
