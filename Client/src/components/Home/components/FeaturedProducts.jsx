import React from "react";
import Card from "../../Card/Card";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
	const { data, isLoading, error } = useFetch(
		`/products?populate=*&[filters][type][$eq]=${type}`
	);
	console.log(data);

	return (
		<div className="featured-products">
			<div className="head">
				<h2>{type} Products</h2>
				<p>
					Explore our curated selection of top-rated and
					customer-favorite products. These are the must-have items
					that our shoppers can't get enough of! Whether you're
					looking for the latest trends or timeless essentials, our
					featured products offer something special for everyone.
				</p>
			</div>
			<div className="products">
				{data.map(product => (
					<Card product={product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;
