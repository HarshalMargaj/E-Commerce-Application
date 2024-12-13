import { addProdToCart, deleteWishlistProd } from "../../api/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../Loaders/ButtonLoader";

const WishlistCard = ({ item }) => {
	const user = useSelector(state => state.user.user);
	const jwt = sessionStorage.getItem("jwt");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div>
			<div className="relative flex flex-col gap-2" key={item.id}>
				<div>
					<img
						src={item.product_image}
						alt=""
						className="w-[300px] h-[400px]"
					/>
				</div>
				<div>{item.product_name}</div>
				<div className="flex items-baseline gap-2">
					<div className="font-medium text-[#2879fe] text-2xl">
						${item.product_price}
						<small className="text-sm text-gray-400">M.R.P</small>
					</div>
					<div className="text-gray-400">
						${item.product_price + 60}
					</div>
					<span>(20% off)</span>
				</div>
				<div>
					<button
						className="bg-[#2879fe] text-white w-[200px] border-none py-2 px-3 rounded-md gap-1 flex items-center justify-center h-10"
						onClick={() =>
							addProdToCart(
								jwt,
								user.id,
								item.product_id,
								navigate,
								dispatch,
								setIsLoading
							)
						}
					>
						{isLoading ? (
							<ButtonLoader color={"text-white"} />
						) : (
							<div className="flex items-center gap-2">
								<FiShoppingCart /> Move to cart
							</div>
						)}
					</button>
				</div>
				<div
					className="absolute top-[10px] right-[10px] cursor-pointer"
					onClick={() => deleteWishlistProd(item.id, jwt, dispatch)}
				>
					<IoIosCloseCircle color="#eeeef2" size={25} />
				</div>
			</div>
		</div>
	);
};

export default WishlistCard;
