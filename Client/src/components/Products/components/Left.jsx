import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const Left = () => {
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
		<div className="left-container">
			<div className="category">
				<h2>Category</h2>
				<FormControlLabel
					sx={{
						".css-ahj2mt-MuiTypography-root": {
							fontSize: 14,
							fontWeight: 500,
						},
					}}
					control={<Checkbox defaultChecked />}
					label="Label"
				/>
				<FormControlLabel
					sx={{
						".css-ahj2mt-MuiTypography-root": {
							fontSize: 14,
							fontWeight: 500,
						},
					}}
					control={<Checkbox defaultChecked />}
					label="Label"
				/>
				<FormControlLabel
					sx={{
						".css-ahj2mt-MuiTypography-root": {
							fontSize: 14,
							fontWeight: 500,
						},
					}}
					control={<Checkbox defaultChecked />}
					label="Label"
				/>
				<FormControlLabel
					sx={{
						".css-ahj2mt-MuiTypography-root": {
							fontSize: 14,
							fontWeight: 500,
						},
					}}
					control={<Checkbox defaultChecked />}
					label="Label"
				/>
				<FormControlLabel
					sx={{
						".css-ahj2mt-MuiTypography-root": {
							fontSize: 14,
							fontWeight: 500,
						},
					}}
					control={<Checkbox defaultChecked />}
					label="Label"
				/>
			</div>
			<div className="price-slider">
				<h2>Price</h2>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={100}
					valueLabelDisplay="on"
				/>
			</div>
		</div>
	);
};

export default Left;
