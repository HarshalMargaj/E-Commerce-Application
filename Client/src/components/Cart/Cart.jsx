import React from "react";
// import "./Cart.css";
import Quantity from "../Product/components/Quantity";
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

	const subtotal = () => {
		let sum = 0;
		products.forEach(element => {
			sum += element.price;
		});
		return sum;
	};

	const discount = () => products.length * 60;

	return (
		<div className="p-10 flex justify-between">
			<div className="w-[60%]">
				{products.map(d => (
					<div
						className="border-y flex gap-5 items-center p-5"
						key={d.id}
					>
						<div className="w-[15%]">
							<img
								src={import.meta.env.VITE_UPLOAD_URL + d.image}
								alt=""
								className="w-[100px] h-[100px]"
							/>
						</div>
						<div className="flex flex-col gap-2 w-[85%]">
							<div>
								<h3>{d.name}</h3>
								<div className="text-gray-400">
									{d.description}
								</div>
								<div>${d.price}</div>
							</div>
							<div className="flex items-center gap-5">
								<div>
									<Quantity />
								</div>
								<div
									className="flex items-center cursor-pointer"
									onClick={() =>
										deleteCartItem(d.id, jwt, dispatch)
									}
								>
									<AiOutlineDelete color="red" />
								</div>
								<div
									className="flex items-center gap-2 text-[#2879fe] cursor-pointer"
									onClick={() =>
										addProdToWishlist(
											user.id,
											d.product_id,
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
