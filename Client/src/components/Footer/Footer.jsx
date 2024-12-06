import React from "react";
import stripe from "../../assets/stripe.png";
import applepay from "../../assets/apple-pay.png";
import googlepay from "../../assets/google-pay.png";
import visa from "../../assets/card.png";
import paypal from "../../assets/social.png";

const Footer = () => {
	return (
		<div className="p-[60px] flex flex-col gap-10">
			<div className="flex justify-between gap-[100px]">
				<div className="flex flex-col gap-5">
					<h3>Categories</h3>
					<ul className="flex flex-col gap-2 text-sm text-gray-400">
						<li>Men</li>
						<li>Women</li>
						<li>Shoes</li>
						<li>Accessories</li>
					</ul>
				</div>
				<div className="flex flex-col gap-5">
					<h3>Links</h3>
					<ul className="flex flex-col gap-2 text-sm text-gray-400">
						<li>Home</li>
						<li>About</li>
						<li>Contact</li>
						<li>Products</li>
					</ul>
				</div>
				<div className="flex flex-col gap-5">
					<h3>About</h3>
					<p className="text-sm text-gray-400">
						At TrendTreasure, we believe that shopping should be an
						exciting and fulfilling experience. Our mission is to
						bring you a curated selection of high-quality products
						that cater to your needs and desires, all in one
						convenient place.
					</p>
				</div>
				<div className="flex flex-col gap-5">
					<h3 className="font-medium text-gray-400">Contact</h3>
					<p>
						At TrendTreasure, we are committed to providing you with
						exceptional service. If you have any questions,
						concerns, or feedback, please don’t hesitate to reach
						out to us. We’re here to help!
					</p>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="text-3xl text-[#2879fe]">TrendTreasure</div>
					<div>© 2024 TrendTreasure. All rights reserved.</div>
				</div>
				<div className="flex gap-5 items-center">
					<img src={stripe} alt="" className="w-[50px]" />
					<img src={googlepay} alt="" className="w-[50px]" />
					<img src={applepay} alt="" className="w-[50px]" />
					<img src={visa} alt="" className="w-[50px]" />
					<img src={paypal} alt="" className="w-[50px]" />
				</div>
			</div>
		</div>
	);
};

export default Footer;
