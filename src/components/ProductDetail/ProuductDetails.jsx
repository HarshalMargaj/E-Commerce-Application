import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const ProuductDetails = () => {
	return (
		<div className="category-products">
			<div className="left">
				<Left />
			</div>
			<div className="right">
				<Right />
			</div>
		</div>
	);
};

export default ProuductDetails;
