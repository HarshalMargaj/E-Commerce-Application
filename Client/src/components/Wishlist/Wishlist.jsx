import React from "react";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addProdToCart, deleteWishlistProd } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
	const wishlists = useSelector(state => state.cart.wishlists);
	const user = useSelector(state => state.user.user);
	const jwt = sessionStorage.getItem("jwt");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log(wishlists);

	return (
		<div>
			<div className="py-10 px-[60px] pb-0 text-gray-400">
				<span className="text-2xl font-medium text-black">
					My Wishlist
				</span>{" "}
				{wishlists.length} items
			</div>
			<div className="py-10 px-[60px] flex justify-start gap-10 flex-wrap">
				{wishlists.map(item => (
					<div className="relative flex flex-col gap-2" key={item.id}>
						<div>
							<img
								src={item.product_image}
								alt=""
								className="w-[300px] h-[300px]"
							/>
						</div>
						<div>{item.product_name}</div>
						<div className="flex items-baseline gap-2">
							<div className="font-medium text-[#2879fe] text-2xl">
								${item.product_price}
								<small className="text-sm text-gray-400">
									M.R.P
								</small>
							</div>
							<div className="text-gray-400">
								${item.product_price + 60}
							</div>
							<span>(20% off)</span>
						</div>
						<div>
							<button
								className="bg-[#2879fe] text-white w-[200px] border-none py-2 px-3 rounded-md gap-1 flex items-center justify-center"
								onClick={() =>
									addProdToCart(
										jwt,
										user.id,
										item.product_id,
										navigate,
										dispatch
									)
								}
							>
								<FiShoppingCart /> Move to cart
							</button>
						</div>
						<div
							className="absolute top-[10px] right-[10px] cursor-pointer"
							onClick={() =>
								deleteWishlistProd(item.id, jwt, dispatch)
							}
						>
							<IoIosCloseCircle color="#eeeef2" size={25} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Wishlist;
