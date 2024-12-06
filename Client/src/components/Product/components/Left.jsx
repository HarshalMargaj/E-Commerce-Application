import React, { useState } from "react";

const Left = ({ data }) => {
	const [selectedImage, setSelectedImage] = useState("product_image");

	return (
		<div className="flex p-5 gap-5">
			<div className=" flex flex-col gap-2">
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						data.attributes.product_image.data.attributes.url
					}
					onClick={() => setSelectedImage("product_image")}
					className="w-[100px] h-[100px]"
				/>
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						data.attributes.product_image_2.data.attributes.url
					}
					onClick={() => setSelectedImage("product_image_2")}
					className="w-[100px] h-[100px]"
				/>
			</div>
			<div className="main-img">
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						data.attributes[selectedImage].data.attributes.url
					}
					alt=""
					className="w-[500px] h-[500px]"
				/>
			</div>
		</div>
	);
};

export default Left;
