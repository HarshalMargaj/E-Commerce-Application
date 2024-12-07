import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi"; // Import React Icons for minus and plus

const QuantityInput = ({ min = 1, max = 99, initialValue = 1, ...props }) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = increment => {
		setValue(prevValue => {
			const newValue = prevValue + increment;
			if (newValue >= min && newValue <= max) {
				return newValue;
			}
			return prevValue;
		});
	};

	return (
		<div className="flex items-center gap-2" {...props}>
			<button
				onClick={() => handleChange(-1)}
				className="w-4 h-4 flex items-center justify-center bg-gray-200 rounded-full border border-gray-300 hover:bg-blue-500 hover:border-blue-400 transition duration-200"
			>
				<FiMinus className="text-sm" />
			</button>
			<input
				value={value}
				readOnly
				className="w-10 h-6 text-center text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
			/>
			<button
				onClick={() => handleChange(1)}
				className="w-4 h-4 flex items-center justify-center bg-gray-200 rounded-full border border-gray-300 hover:bg-blue-500 hover:border-blue-400 transition duration-200"
			>
				<FiPlus className="text-sm" />
			</button>
		</div>
	);
};

export default QuantityInput;
