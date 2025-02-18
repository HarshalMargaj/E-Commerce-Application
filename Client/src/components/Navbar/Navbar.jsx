import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import CartIcon from "./components/CartIcon";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "../Home/components/Categories";
import { FaRegHeart } from "react-icons/fa";
import { resetCart, resetWishlist } from "../../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";
import { useSelector } from "react-redux";
import { allProducts } from "../../api/api";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import CustomModal from "../Modal/Modal";
import Login from "../Login/Login";
import SignUp from "../Signup/Signup";
import toast from "react-hot-toast";

const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const loginuser = useSelector(state => state.user.user);
	const isLogin = sessionStorage.getItem("jwt") ? true : false;
	const dispatch = useDispatch();
	const jwt = sessionStorage.getItem("jwt");
	const [products, setProducts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isClickedOnSignup, setIsClickedOnSignup] = useState(false);
	console.log(products);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const categoryDropdownContent = (
		<div className="bg-white shadow-md w-[1300px] rounded-md p-2">
			<Categories />
		</div>
	);

	const logout = () => {
		sessionStorage.clear();
		dispatch(logoutUser());
		dispatch(resetCart());
		dispatch(resetWishlist());
		toast.success("You have successfully logged out.");
	};

	const profileDropdown = (
		<div className="bg-white rounded-md shadow-lg p-2">
			<div
				onClick={logout}
				className="cursor-pointer flex items-center gap-2 py-2 px-3 hover:bg-red-100 text-red-600 rounded-md"
			>
				<TbLogout />
				Log out
			</div>
		</div>
	);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await allProducts();
				console.log(res);
				setProducts(res.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);

	const searchFilter = products.filter(product =>
		product.attributes.product_name
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	const searchDropdown = (
		<div className="absolute w-full bg-white shadow-md rounded-md max-h-[500px] z-10 p-2">
			{searchFilter.map(product => (
				<Link to={`/product/${product.id}`} key={product.id}>
					<div
						onClick={() =>
							setSearchQuery(product.attributes.product_name)
						}
						className="hover:bg-gray-100 rounded-md py-2 px-3 cursor-pointer capitalize"
					>
						{product.attributes.product_name}
					</div>
				</Link>
			))}
		</div>
	);

	const handleClickAway = () => {
		setSearchQuery("");
	};

	return (
		<div className="flex justify-between h-[75px] items-center border-b py-2 px-[60px]">
			<div className="flex items-center gap-5">
				<Link to={"/"} className="text-[32px] text-[#2879fe]">
					<div>ShopVista</div>
				</Link>
				<Tippy
					content={categoryDropdownContent}
					interactive={true}
					placement="bottom"
					offset={[-100, 40]}
					trigger="click"
				>
					<div className="flex items-center gap-[5px] cursor-pointer">
						Categories <MdKeyboardArrowDown />
					</div>
				</Tippy>
			</div>
			<ClickAwayListener onClickAway={handleClickAway}>
				<div className="relative w-[40%]">
					<div className="w-full border flex gap-[10px] p-2 items-center rounded-lg">
						<FaSearch />
						<input
							type="text"
							placeholder="Search products"
							className="w-full border-none outline-none mb-0"
							onChange={e => setSearchQuery(e.target.value)}
							value={searchQuery}
						/>
					</div>
					{searchQuery && <div>{searchDropdown}</div>}
				</div>
			</ClickAwayListener>
			<div className="flex items-center gap-5">
				<Link
					to={"/wishlist"}
					className="text-black hover:bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center"
				>
					<FaRegHeart />
				</Link>

				<CartIcon />

				{!isLogin ? (
					// <Link to={"/login"}>
					<button
						onClick={openModal}
						className="bg-blue-500 text-white h-8 rounded-md px-3"
					>
						Login
					</button>
				) : (
					// </Link>
					<Tippy
						content={profileDropdown}
						interactive={true}
						placement="bottom"
						trigger="click"
					>
						<div className="cursor-pointer flex items-center gap-2 font-medium">
							<span className="text-gray-800">
								Welcome, {loginuser && loginuser?.username}
							</span>
							<FaUserCircle size={24} className="text-gray-500" />
						</div>
					</Tippy>
				)}
			</div>
			<CustomModal
				isOpen={isModalOpen}
				onClose={closeModal}
				title="Custom Modal Title"
			>
				{!isClickedOnSignup ? (
					<Login
						setIsClickedOnSignup={setIsClickedOnSignup}
						setIsModalOpen={setIsModalOpen}
					/>
				) : (
					<SignUp setIsClickedOnSignup={setIsClickedOnSignup} />
				)}
			</CustomModal>
		</div>
	);
};

export default Navbar;
