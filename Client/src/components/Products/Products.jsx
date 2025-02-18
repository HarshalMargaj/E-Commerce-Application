import React, { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Tippy from "@tippyjs/react";
import Loader from "../Loaders/Loader";

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

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-[90vh]">
				<Loader />
			</div>
		);
	}

	const sortByOptions = [
		{ id: 1, option: "Price: low to high", action: "asc" },
		{ id: 2, option: "Price: high to low", action: "desc" },
		{ id: 3, option: "Featured Products", action: "featured" },
		{ id: 4, option: "Trending Products", action: "trending" },
		{ id: 5, option: "--", action: "" },
	];

	const sortByDropdownContent = (
		<div className="bg-white shadow-md p-2 rounded-md">
			{sortByOptions.map(item => (
				<div
					key={item.id}
					className="py-1 px-3 cursor-pointer hover:bg-gray-100 rounded-md"
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
			<div className="py-5 px-5 md:px-10 border-b flex justify-between items-center h-5">
				<div>Results : {results}</div>

				<div className="flex justify-between items-center gap-2">
					<div>Sort by : </div>
					<Tippy
						content={sortByDropdownContent}
						interactive={true}
						placement="bottom"
						trigger="click"
					>
						<div className="border w-[150px] p-1 rounded-md">
							{value}
						</div>
					</Tippy>
				</div>
			</div>
			<div className="flex md:flex-row flex-col md:p-10 p-5">
				<div className="md:w-[20%] md:border-r md:p-5">
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
				<div className="w-[80%] p-5">
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
