import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductDetail from "./components/ProductDetail/ProuductDetails";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/products" element={<Products />} />
					<Route path="/products/:id" element={ProductDetail} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
