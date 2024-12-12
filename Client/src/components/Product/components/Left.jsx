import React, { useState } from "react";

const Left = ({ data }) => {
	const [selectedImage, setSelectedImage] = useState("product_image");

	// Helper function to get the full image URL
	const getImageUrl = imageData => {
		return imageData?.url?.startsWith("http")
			? imageData.url
			: `${import.meta.env.VITE_UPLOAD_URL}${imageData?.url}`;
	};

	return (
		<div className="flex p-5 gap-5">
			{/* Thumbnail Images */}
			<div className="flex flex-col gap-2">
				{/* First Thumbnail */}
				<img
					src={getImageUrl(
						data?.attributes?.product_image?.data?.attributes
					)}
					alt={data?.attributes?.product_name || "Product Image"}
					className="w-[100px] h-[100px] cursor-pointer"
					onClick={() => setSelectedImage("product_image")}
				/>

				{/* Second Thumbnail */}
				<img
					src={getImageUrl(
						data?.attributes?.product_image_2?.data?.attributes
					)}
					alt={data?.attributes?.product_name || "Product Image"}
					className="w-[100px] h-[100px] cursor-pointer"
					onClick={() => setSelectedImage("product_image_2")}
				/>
			</div>

			{/* Main Image */}
			<div className="main-img">
				<img
					src={getImageUrl(
						data?.attributes?.[selectedImage]?.data?.attributes
					)}
					alt={
						data?.attributes?.product_name ||
						"Selected Product Image"
					}
					className="w-[500px] h-[500px]"
				/>
			</div>
		</div>
	);
};

export default Left;
