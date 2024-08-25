import React, { useState } from "react";

const Left = ({ data }) => {
	const [selectedImage, setSelectedImage] = useState("product_image");

	return (
		<div className="left">
			<div className="img-nav">
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						data.attributes.product_image.data.attributes.url
					}
					onClick={() => setSelectedImage("product_image")}
				/>
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						data.attributes.product_image_2.data.attributes.url
					}
					onClick={() => setSelectedImage("product_image_2")}
				/>
			</div>
			<div className="main-img">
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						data.attributes[selectedImage].data.attributes.url
					}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Left;
