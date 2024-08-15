import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
	console.log(product);
	return (
		<Link to={`/product/${product.id}`}>
			<div className="card">
				<img src={product.image} alt="" width={300} height={300} />
				<h3 style={{ color: "dimgray", fontWeight: "500" }}>
					{product.name}
				</h3>
				<p>{product.description}</p>
				<p>Price: ${product.price}</p>
			</div>
		</Link>
	);
};

export default Card;
