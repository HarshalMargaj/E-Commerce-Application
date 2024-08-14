import React from "react";
import product1 from "../../../assets/product1.jpg";
import product2 from "../../../assets/product2.jpg";
import product3 from "../../../assets/product3.jpg";
import product4 from "../../../assets/product4.jpg";

const TrendingProducts = () => {
	const trendingProducts = [
		{
			id: 1,
			name: "Classic Denim Jacket",
			description:
				"A timeless denim jacket with a relaxed fit, perfect for layering over any outfit.",
			price: 79.99,
			image: product1,
		},
		{
			id: 2,
			name: "Cotton Crewneck T-Shirt",
			description:
				"Soft and comfortable, this cotton crewneck t-shirt is a wardrobe essential.",
			price: 19.99,
			image: product2,
		},
		{
			id: 3,
			name: "Slim Fit Chinos",
			description:
				"Stylish and versatile slim fit chinos, perfect for both casual and formal occasions.",
			price: 49.99,
			image: product3,
		},
		{
			id: 4,
			name: "Floral Print Summer Dress",
			description:
				"A light and breezy summer dress with a beautiful floral print, ideal for warm weather.",
			price: 69.99,
			image: product4,
		},
	];

	return (
		<div className="featured-products">
			<div className="head">
				<h2>Trending Products</h2>
				<p>
					Stay ahead of the curve with our trending products. These
					items are flying off the shelves and are the most
					sought-after by our customers. Whether you're updating your
					wardrobe or looking for the perfect gift, these trending
					products are sure to impress.
				</p>
			</div>
			<div className="products">
				{trendingProducts.map(product => (
					<div className="product">
						<img
							src={product.image}
							alt=""
							width={300}
							height={300}
						/>
						<h3 style={{ color: "dimgray", fontWeight: "500" }}>
							{product.name}
						</h3>
						<p>{product.description}</p>
						<p>Price: ${product.price}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingProducts;
