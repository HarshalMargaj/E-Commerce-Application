import React from "react";
import Card from "../Card/Card";
import useFetch from "../hooks/useFetch";
import Loader from "../Loaders/Loader";

const List = ({
	catId,
	selectedSubcatsIds,
	maxPrice,
	sort,
	type,
	remove,
	setResults,
}) => {
	const sortQuery = sort ? `&sort=product_price:${sort}` : "";
	const typeQuery = type ? `&[filters][type][$eq]=${type}` : "";

	const { data, isLoading, error } = useFetch(
		`/products?populate=*&[filters][categories][id][$eq]=${catId}${selectedSubcatsIds.map(
			item => `&[filters][sub_categories][id][$eq]=${item}`
		)}&[filters][product_price][$lte]=${maxPrice}${sortQuery}${typeQuery}
		`
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-[80vh]">
				<Loader />
			</div>
		);
	}

	setResults(data.length);
	console.log(data);

	return (
		<div className="flex gap-y-5 flex-wrap justify-between">
			{data.map(l => (
				<Card product={l} key={l.id} />
			))}
		</div>
	);
};

export default List;
