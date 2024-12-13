import React from "react";
import { useSelector } from "react-redux";

import WishlistCard from "../Card/WishlistCard";

const Wishlist = () => {
	const wishlists = useSelector(state => state.cart.wishlists);

	return (
		<div>
			<div className="py-10 px-[60px] pb-0 text-gray-400">
				<span className="text-2xl font-medium text-black">
					My Wishlist
				</span>{" "}
				{wishlists.length} items
			</div>
			<div className="py-10 px-[60px] flex justify-start gap-3 flex-wrap">
				{wishlists.map(item => (
					<WishlistCard item={item} />
				))}
			</div>
		</div>
	);
};

export default Wishlist;
