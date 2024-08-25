import React from "react";
import Card from "../Card/Card";
import useFetch from "../hooks/useFetch";

import "./LIst.css";

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

	setResults(data.length);

	return (
		<div className="list">
			{data.map(l => (
				<Card product={l} key={l.id} />
			))}
		</div>
	);
};

export default List;
