import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import ReactModal from "react-modal";

// Bind modal to appElement (prevents screen readers from reading content outside modal)
ReactModal.setAppElement("#root");

const CustomModal = ({ isOpen, onClose, title, children, customStyles }) => {
	// Default modal styles
	const defaultStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			// padding: "20px",
			borderRadius: "10px",
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
			background: "#fff",
			border: "1px solid #ccc",
			width: "600px",
			maxWidth: "90vw",
			zIndex: "999",
		},
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			backdropFilter: "blur(1px)",
		},
	};

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onClose}
			style={customStyles || defaultStyles}
		>
			<div>{children}</div>
		</ReactModal>
	);
};

export default CustomModal;
