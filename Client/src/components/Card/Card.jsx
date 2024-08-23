import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
	return (
		<Link to={`/product/${product.id}`}>
			<div className="card">
				<img
					src={
						import.meta.env.VITE_UPLOAD_URL +
						product.attributes.product_image.data.attributes.url
					}
					alt=""
					width={300}
					height={300}
				/>
				<h3 style={{ color: "dimgray", fontWeight: "500" }}>
					{product.attributes.product_name}
				</h3>
				<p>{product.attributes.product_description}</p>
				<p>Price: ${product.attributes.product_price}</p>
			</div>
		</Link>
	);
};

export default Card;
