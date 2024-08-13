import React from "react";
import "./Footer.css";

import stripe from "../../assets/stripe.png";
import applepay from "../../assets/apple-pay.png";
import googlepay from "../../assets/google-pay.png";
import visa from "../../assets/card.png";
import paypal from "../../assets/social.png";

const Footer = () => {
	return (
		<div className="footer-container">
			<div className="top">
				<div>
					<h3>Categories</h3>
					<ul>
						<li>Men</li>
						<li>Women</li>
						<li>Shoes</li>
						<li>Accessories</li>
					</ul>
				</div>
				<div>
					<h3>Links</h3>
					<ul>
						<li>Home</li>
						<li>About</li>
						<li>Contact</li>
						<li>Products</li>
					</ul>
				</div>
				<div>
					<h3>About</h3>
					<p>
						At TrendTreasure, we believe that shopping should be an
						exciting and fulfilling experience. Our mission is to
						bring you a curated selection of high-quality products
						that cater to your needs and desires, all in one
						convenient place.
					</p>
				</div>
				<div>
					<h3>Contact</h3>
					<p>
						At TrendTreasure, we are committed to providing you with
						exceptional service. If you have any questions,
						concerns, or feedback, please don’t hesitate to reach
						out to us. We’re here to help!
					</p>
				</div>
			</div>
			<div className="bottom">
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
					}}
				>
					<div className="icon">TrendTreasure</div>
					<div className="copyright">
						© 2024 TrendTreasure. All rights reserved.
					</div>
				</div>
				<div className="payments">
					<img src={stripe} alt="" />
					<img src={googlepay} alt="" />
					<img src={applepay} alt="" />
					<img src={visa} alt="" />
					<img src={paypal} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Footer;
