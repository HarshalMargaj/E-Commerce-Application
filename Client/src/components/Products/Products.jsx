import React, { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import "./Products.css";
import useFetch from "../hooks/useFetch";
import Tippy from "@tippyjs/react";

const Products = () => {
	const [selectedSubcatsIds, setSelectedSubcatsIds] = useState([]);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [sort, setSort] = useState(null);
	const [value, setValue] = useState("--");
	const [type, setType] = useState(null);
	const [remove, setRemove] = useState();
	const [results, setResults] = useState();
	const catId = parseInt(useParams().id);
	const { data, isLoading, error } = useFetch(
		`/sub-categories?[filters][categories][id][$eq]=${catId}`
	);

	const sortByOptions = [
		{ id: 1, option: "Price: low to high", action: "asc" },
		{ id: 2, option: "Price: high to low", action: "desc" },
		{ id: 3, option: "Featured Products", action: "featured" },
		{ id: 4, option: "Trending Products", action: "trending" },
		{ id: 5, option: "--", action: "" },
	];

	const sortByDropdownContent = (
		<div className="sortByDropdownContent">
			{sortByOptions.map(item => (
				<div
					key={item.id}
					className="option"
					onClick={() => {
						if (item.action === "asc" || item.action === "desc")
							setSort(item.action);
						else if (item.action === "") {
							setSort(null);
							setType(null);
						} else setType(item.action);
						setValue(item.option);
					}}
				>
					{item.option === "--" ? "Remove Filter" : item.option}
				</div>
			))}
		</div>
	);
	return (
		<div>
			<div className="top-bar">
				<div>Results : {results}</div>

				<div className="sort-drop" style={{ display: "flex" }}>
					<div>Sort by : </div>
					<Tippy
						content={sortByDropdownContent}
						interactive={true}
						placement="bottom"
						trigger="click"
					>
						<div className="drop">{value}</div>
					</Tippy>
				</div>
			</div>
			<div className="category-products">
				<div className="left">
					<Left
						catId={catId}
						data={data}
						selectedSubcatsIds={selectedSubcatsIds}
						setSelectedSubcatsIds={setSelectedSubcatsIds}
						maxPrice={maxPrice}
						setMaxPrice={setMaxPrice}
						sort={sort}
						setSort={setSort}
					/>
				</div>
				<div className="right">
					<Right
						catId={catId}
						selectedSubcatsIds={selectedSubcatsIds}
						maxPrice={maxPrice}
						sort={sort}
						type={type}
						remove={remove}
						setResults={setResults}
					/>
				</div>
			</div>
		</div>
	);
};

export default Products;
