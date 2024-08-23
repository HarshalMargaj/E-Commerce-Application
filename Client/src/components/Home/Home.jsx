import React from "react";
import "./Hero.css";
import Slider from "./components/Slider";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";

const Home = () => {
	return (
		<div>
			<Slider />
			<FeaturedProducts type="featured" />
			<Categories />
			<FeaturedProducts type="trending" />
		</div>
	);
};

export default Home;
