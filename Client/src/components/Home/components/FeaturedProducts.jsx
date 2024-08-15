import React from "react";
import product1 from "../../../assets/product1.jpg";
import product2 from "../../../assets/product2.jpg";
import product3 from "../../../assets/product3.jpg";
import product4 from "../../../assets/product4.jpg";
import Card from "../../Card/Card";

const FeaturedProducts = () => {
	const featuredProducts = [
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
				<h2>Featured Products</h2>
				<p>
					Explore our curated selection of top-rated and
					customer-favorite products. These are the must-have items
					that our shoppers can't get enough of! Whether you're
					looking for the latest trends or timeless essentials, our
					featured products offer something special for everyone.
				</p>
			</div>
			<div className="products">
				{featuredProducts.map(product => (
					<Card product={product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;
