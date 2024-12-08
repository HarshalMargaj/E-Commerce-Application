import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItem, addProdToWishlist } from "../../api/api";

const Cart = () => {
	const products = useSelector(state => state.cart.products);
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();
	const jwt = sessionStorage.getItem("jwt");
	const [quantities, setQuantities] = useState(
		products.reduce((acc, product) => {
			acc[product.id] = 1; // Default quantity is 1 for each product
			return acc;
		}, {})
	);

	// Function to handle quantity change
	const handleQuantityChange = (id, newQuantity) => {
		setQuantities(prev => ({
			...prev,
			[id]: newQuantity > 0 ? newQuantity : 1, // Prevent negative or zero quantity
		}));
	};

	// Calculate subtotal dynamically
	const subtotal = () => {
		return products.reduce((sum, product) => {
			return sum + product.price * (quantities[product.id] || 1);
		}, 0);
	};

	const discount = () => products.length * 60;

	return (
		<div className="p-10 flex justify-between">
			<div className="w-[60%]">
				{products.map(product => (
					<div
						className="border-y flex gap-5 items-center p-5"
						key={product.id}
					>
						<div className="w-[15%]">
							<img
								src={
									import.meta.env.VITE_UPLOAD_URL +
									product.image
								}
								alt=""
								className="w-[100px] h-[100px]"
							/>
						</div>
						<div className="flex flex-col gap-2 w-[85%]">
							<div>
								<h3>{product.name}</h3>
								<div className="text-gray-400">
									{product.description}
								</div>
								<div className="text-gray-600">
									${product.price} x {quantities[product.id]}{" "}
									={" "}
									<span className="text-[#2879fe]">
										$
										{product.price * quantities[product.id]}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-5">
								<div className="flex items-center gap-2">
									<button
										className="px-2 py-1 bg-gray-200 rounded"
										onClick={() =>
											handleQuantityChange(
												product.id,
												quantities[product.id] - 1
											)
										}
									>
										-
									</button>
									<span>{quantities[product.id]}</span>
									<button
										className="px-2 py-1 bg-gray-200 rounded"
										onClick={() =>
											handleQuantityChange(
												product.id,
												quantities[product.id] + 1
											)
										}
									>
										+
									</button>
								</div>
								<div
									className="flex items-center cursor-pointer"
									onClick={() =>
										deleteCartItem(
											product.id,
											jwt,
											dispatch
										)
									}
								>
									<AiOutlineDelete color="red" />
								</div>
								<div
									className="flex items-center gap-2 text-[#2879fe] cursor-pointer"
									onClick={() =>
										addProdToWishlist(
											user.id,
											product.product_id,
											jwt,
											dispatch
										)
									}
								>
									<FaRegHeart />
									Move to wishlist
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="w-[40%] flex justify-center items-start">
				<div className="max-h-[300px] w-[300px] shadow-md rounded">
					<div>
						<div className="py-2 px-3 text-2xl">Payment</div>
						<div className="py-2 px-3 border-b flex justify-between">
							Subtotal item({products.length})
							<div>${subtotal() + products.length * 60}</div>
						</div>
						<div className="py-2 px-3 border-b flex justify-between text-red-500">
							Discount
							<div>-${discount()}</div>
						</div>
						<div className="py-2 px-3 border-b flex justify-between">
							Total
							<div>${subtotal()}</div>
						</div>
						<div className="flex justify-center py-2 px-3">
							<button className="bg-[#2879fe] text-white py-2 px-3 border-none rounded w-ful">
								Proceed to buy
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
// import React, { useState } from "react";
// import { AiOutlineDelete } from "react-icons/ai";
// import { FaRegHeart } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteCartItem, addProdToWishlist } from "../../api/api";

// const Cart = () => {
// 	const products = useSelector(state => state.cart.products);
// 	const user = useSelector(state => state.user.user);
// 	const dispatch = useDispatch();
// 	const jwt = sessionStorage.getItem("jwt");

// 	// State to manage quantities for each product
// 	const [quantities, setQuantities] = useState(
// 		products.reduce((acc, product) => {
// 			acc[product.id] = 1; // Default quantity is 1 for each product
// 			return acc;
// 		}, {})
// 	);

// 	// Function to handle quantity change
// 	const handleQuantityChange = (id, newQuantity) => {
// 		setQuantities(prev => ({
// 			...prev,
// 			[id]: newQuantity > 0 ? newQuantity : 1, // Prevent negative or zero quantity
// 		}));
// 	};

// 	// Calculate subtotal dynamically
// 	const subtotal = () => {
// 		return products.reduce((sum, product) => {
// 			return sum + product.price * (quantities[product.id] || 1);
// 		}, 0);
// 	};

// 	// Calculate discount dynamically
// 	const discount = () => products.length * 60;

// 	return (
// 		<div className="p-10 flex justify-between">
// 			<div className="w-[60%]">
// 				{products.map(product => (
// 					<div
// 						className="border-y flex gap-5 items-center p-5"
// 						key={product.id}
// 					>
// 						<div className="w-[15%]">
// 							<img
// 								src={
// 									import.meta.env.VITE_UPLOAD_URL +
// 									product.image
// 								}
// 								alt=""
// 								className="w-[100px] h-[100px]"
// 							/>
// 						</div>
// 						<div className="flex flex-col gap-2 w-[85%]">
// 							<div>
// 								<h3>{product.name}</h3>
// 								<div className="text-gray-400">
// 									{product.description}
// 								</div>
// 								<div className="text-gray-600">
// 									${product.price} x {quantities[product.id]}{" "}
// 									={" "}
// 									<span className="text-[#2879fe]">
// 										$
// 										{product.price * quantities[product.id]}
// 									</span>
// 								</div>
// 							</div>
// 							<div className="flex items-center gap-5">
// 								{/* Quantity controls */}
// 								<div className="flex items-center gap-2">
// 									<button
// 										className="px-2 py-1 bg-gray-200 rounded"
// 										onClick={() =>
// 											handleQuantityChange(
// 												product.id,
// 												quantities[product.id] - 1
// 											)
// 										}
// 									>
// 										-
// 									</button>
// 									<span>{quantities[product.id]}</span>
// 									<button
// 										className="px-2 py-1 bg-gray-200 rounded"
// 										onClick={() =>
// 											handleQuantityChange(
// 												product.id,
// 												quantities[product.id] + 1
// 											)
// 										}
// 									>
// 										+
// 									</button>
// 								</div>

// 								{/* Delete and move to wishlist */}
// 								<div
// 									className="flex items-center cursor-pointer"
// 									onClick={() =>
// 										deleteCartItem(
// 											product.id,
// 											jwt,
// 											dispatch
// 										)
// 									}
// 								>
// 									<AiOutlineDelete color="red" />
// 								</div>
// 								<div
// 									className="flex items-center gap-2 text-[#2879fe] cursor-pointer"
// 									onClick={() =>
// 										addProdToWishlist(
// 											user.id,
// 											product.id,
// 											jwt,
// 											dispatch
// 										)
// 									}
// 								>
// 									<FaRegHeart />
// 									Move to wishlist
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 			<div className="w-[40%] flex justify-center items-start">
// 				<div className="max-h-[300px] w-[300px] shadow-md rounded">
// 					<div>
// 						<div className="py-2 px-3 text-2xl">Payment</div>
// 						<div className="py-2 px-3 border-b flex justify-between">
// 							Subtotal ({products.length} items)
// 							<div>${subtotal()}</div>
// 						</div>
// 						<div className="py-2 px-3 border-b flex justify-between text-red-500">
// 							Discount
// 							<div>-${discount()}</div>
// 						</div>
// 						<div className="py-2 px-3 border-b flex justify-between">
// 							Total
// 							<div>${subtotal() - discount()}</div>
// 						</div>
// 						<div className="flex justify-center py-2 px-3">
// 							<button className="bg-[#2879fe] text-white py-2 px-3 border-none rounded w-ful">
// 								Proceed to buy
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Cart;
