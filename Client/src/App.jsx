import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {
	const [cartItemsLength, setCartItemsLenght] = useState(1);
	return (
		<Router>
			<div>
				<Navbar
					setCartItemsLenght={setCartItemsLenght}
					cartItemsLength={cartItemsLength}
				/>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/about" element={<About />} />
					<Route
						exact
						path="/product/:id"
						element={
							<Product
								setCartItemsLenght={setCartItemsLenght}
								cartItemsLength={cartItemsLength}
							/>
						}
					/>
					<Route path="/contact" element={<Contact />} />
					<Route
						path="/products/:id"
						element={
							<Products
								setCartItemsLenght={setCartItemsLenght}
								cartItemsLength={cartItemsLength}
							/>
						}
					/>
					<Route
						path="/cart"
						element={
							<Cart
								setCartItemsLenght={setCartItemsLenght}
								cartItemsLength={cartItemsLength}
							/>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
