import React from "react";
import "./Hero.css";
import Slider from "./components/Slider";
import FeaturedProducts from "./components/FeaturedProducts";
import TrendingProducts from "./components/TrendingProducts";
import Categories from "./components/Categories";

const Home = () => {
	return (
		<div>
			<Slider />
			<FeaturedProducts />
			<Categories />
			<TrendingProducts />
		</div>
	);
};

export default Home;
