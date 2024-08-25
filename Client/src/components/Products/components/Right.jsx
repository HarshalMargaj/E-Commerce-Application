import React from "react";
import List from "../../List/List";

const Right = ({
	catId,
	selectedSubcatsIds,
	maxPrice,
	sort,
	type,
	remove,
	setResults,
}) => {
	return (
		<div>
			<List
				catId={catId}
				selectedSubcatsIds={selectedSubcatsIds}
				maxPrice={maxPrice}
				sort={sort}
				type={type}
				remove={remove}
				setResults={setResults}
			/>
		</div>
	);
};

export default Right;
