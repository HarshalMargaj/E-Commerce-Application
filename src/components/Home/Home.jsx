import React from "react";
import "./Hero.css";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
	return (
		<div>
			<div className="hero-section">
				<div className="hero-title">
					Find clothes that <br /> matches your style
				</div>
				<div className="hero-des">
					Browse through our diverse range of meticulously crafted
					garments,
					<br /> designed to bring out your individuality and cater to
					your sense of style
				</div>
				<div>
					<button>
						Shop now <FaArrowRight />
					</button>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default Home;
