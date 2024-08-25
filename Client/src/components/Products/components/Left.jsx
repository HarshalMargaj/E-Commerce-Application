import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const Left = ({
	data,
	selectedSubcatsIds,
	setSelectedSubcatsIds,
	setMaxPrice,
	maxPrice,
	sort,
	setSort,
}) => {
	const handleChange = e => {
		const value = parseInt(e.target.value);
		const isChecked = e.target.checked;

		setSelectedSubcatsIds(
			isChecked
				? [...selectedSubcatsIds, value]
				: selectedSubcatsIds.filter(item => item != value)
		);
	};

	function ValueLabelComponent(props) {
		const { children, value } = props;

		return (
			<Tooltip enterTouchDelay={0} placement="top" title={value}>
				{children}
			</Tooltip>
		);
	}

	ValueLabelComponent.propTypes = {
		children: PropTypes.element.isRequired,
		value: PropTypes.number.isRequired,
	};

	const iOSBoxShadow =
		"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

	const IOSSlider = styled(Slider)(({ theme }) => ({
		color: theme.palette.mode === "dark" ? "#0a84ff" : "#007bff",
		height: 5,
		padding: "15px 0",
		"& .MuiSlider-thumb": {
			height: 20,
			width: 20,
			backgroundColor: "#fff",
			boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
			"&:focus, &:hover, &.Mui-active": {
				boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
				// Reset on touch devices, it doesn't add specificity
				"@media (hover: none)": {
					boxShadow: iOSBoxShadow,
				},
			},
			"&:before": {
				boxShadow:
					"0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
			},
		},
		"& .MuiSlider-valueLabel": {
			fontSize: 12,
			fontWeight: "normal",
			top: -6,
			backgroundColor: "unset",
			color: theme.palette.text.primary,
			"&::before": {
				display: "none",
			},
			"& *": {
				background: "transparent",
				color: theme.palette.mode === "dark" ? "#fff" : "#000",
			},
		},
		"& .MuiSlider-track": {
			border: "none",
			height: 5,
		},
		"& .MuiSlider-rail": {
			opacity: 0.5,
			boxShadow: "inset 0px 0px 4px -2px #000",
			backgroundColor: "#d0d0d0",
		},
	}));
	return (
		<div className="left-container" style={{ position: "sticky", top: 20 }}>
			<div className="category">
				<h2>Categories</h2>
				{data.map(label => (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
						key={label.id}
					>
						<input
							type="checkbox"
							id={label.id}
							value={label.id}
							onChange={handleChange}
						/>
						<label htmlFor={label.id}>
							{label.attributes.subCategory_name}
						</label>
					</div>
				))}
			</div>
			<div className="price-slider">
				<h2>Price</h2>
				<IOSSlider
					aria-label="ios slider"
					min={0}
					max={1000}
					value={maxPrice}
					valueLabelDisplay="on"
					onChange={(event, newValue) => setMaxPrice(newValue)}
				/>
			</div>
		</div>
	);
};

export default Left;
