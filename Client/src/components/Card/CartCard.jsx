import React from "react";

const CartCard = () => {
	return (
		<div>
			<div className="border-y flex items-center p-5" key={product.id}>
				<div className="w-[30%]">
					<img
						src={product.image}
						alt=""
						className="w-[100px] h-[100px]"
					/>
				</div>
				<div className="flex flex-col gap-[10px] w-[70%]">
					<div>
						<h3>{product.name}</h3>
						<div className="text-gray-400">
							{product.description}
						</div>
						<div className="text-gray-600">
							${product.price} x {quantities[product.id]} ={" "}
							<span className="text-[#2879fe]">
								${product.price * quantities[product.id]}
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
							className="flex items-center"
							onClick={() =>
								deleteCartItem(
									product.id,
									jwt,
									dispatch,
									setIsDelLoading
								)
							}
						>
							{isDelLoading ? (
								<ButtonLoader color={"text-red-500"} />
							) : (
								<AiOutlineDelete color="red" />
							)}
						</div>
						<div
							className="flex items-center gap-[10px] text-[#2879fe] cursor-pointer"
							onClick={() =>
								addProdToWishlist(
									user.id,
									product.product_id,
									jwt,
									dispatch,
									setIsWishLoading
								)
							}
						>
							<div className="flex items-center gap-2">
								{isWishLoading && (
									<ButtonLoader color={"text-blue-500"} />
								)}
								<div className="flex items-center gap-2">
									<FaRegHeart /> Move to wishlist
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartCard;
