import React, { useState } from "react";
import product1 from "../../../assets/product1.jpg";
import product2 from "../../../assets/product2.jpg";

const Left = () => {
	const [selectedImage, setSelectedImage] = useState(0);

	const images = [product1, product2];

	return (
		<div className="left">
			<div className="img-nav">
				<img
					src={images[0]}
					alt="product1"
					onClick={() => setSelectedImage(0)}
				/>
				<img
					src={images[1]}
					alt="product2"
					onClick={() => setSelectedImage(1)}
				/>
			</div>
			<div className="main-img">
				<img src={images[selectedImage]} alt="" />
			</div>
		</div>
	);
};

export default Left;
