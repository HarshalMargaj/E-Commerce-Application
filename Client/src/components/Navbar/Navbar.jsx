import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import CartIcon from "./components/CartIcon";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Categories from "../Home/components/Categories";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, resetWishlist } from "../../Redux/cartSlice";
import { logoutUser } from "../../Redux/userSlice";
import { allProducts } from "../../api/api";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import CustomModal from "../Modal/Modal";
import Login from "../Login/Login";
import SignUp from "../Signup/Signup";
import toast from "react-hot-toast";

const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isClickedOnSignup, setIsClickedOnSignup] = useState(false);
	const [products, setProducts] = useState([]);
	const loginuser = useSelector(state => state.user.user);
	const isLogin = sessionStorage.getItem("jwt") ? true : false;
	const dispatch = useDispatch();

	console.log(products);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const logout = () => {
		sessionStorage.clear();
		dispatch(logoutUser());
		dispatch(resetCart());
		dispatch(resetWishlist());
		toast.success("You have successfully logged out.");
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await allProducts();
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
		<div className="flex justify-between items-center h-[75px] border-b py-2 px-4 md:px-[60px]">
			{/* Left Section */}
			<div className="flex items-center gap-5">
				<Link
					to={"/"}
					className="text-[28px] md:text-[32px] text-[#2879fe]"
				>
					ShopVista
				</Link>
				{/* Category Dropdown (Hidden on Mobile) */}
				<Tippy
					content={
						<div className="bg-white shadow-md w-full md:w-[1300px] rounded-md p-2">
							<Categories />
						</div>
					}
					interactive={true}
					placement="bottom"
					offset={[-100, 40]}
					trigger="click"
				>
					<div className="hidden md:flex items-center gap-[5px] cursor-pointer">
						Categories <MdKeyboardArrowDown />
					</div>
				</Tippy>
			</div>

			{/* Mobile Menu Button */}
			<button
				className="md:hidden text-2xl"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{isMenuOpen ? <FaTimes /> : <FaBars />}
			</button>

			{/* Search Bar (Hidden on Mobile) */}
			<ClickAwayListener onClickAway={handleClickAway}>
				<div className="hidden md:flex flex-col relative w-[40%]">
					<div className="w-full border flex gap-[10px] p-2 items-center rounded-lg">
						<FaSearch />
						<input
							type="text"
							placeholder="Search products"
							className="w-full border-none outline-none"
							onChange={e => setSearchQuery(e.target.value)}
							value={searchQuery}
						/>
					</div>
					{searchQuery && (
						<div className="border border-neutral-600">
							searching products {searchDropdown}
						</div>
					)}
				</div>
			</ClickAwayListener>

			{/* Desktop Icons */}
			<div className="hidden md:flex items-center gap-5">
				<Link
					to={"/wishlist"}
					className="hover:bg-gray-100 rounded-full p-2"
				>
					<FaRegHeart size={20} />
				</Link>
				<CartIcon />
				{!isLogin ? (
					<button
						onClick={openModal}
						className="bg-blue-500 text-white h-8 rounded-md px-3"
					>
						Login
					</button>
				) : (
					<Tippy
						content={
							<div className="bg-white rounded-md shadow-lg p-2">
								<div
									onClick={logout}
									className="cursor-pointer flex items-center gap-2 py-2 px-3 hover:bg-red-100 text-red-600 rounded-md"
								>
									<TbLogout />
									Log out
								</div>
							</div>
						}
						interactive={true}
						placement="bottom"
						trigger="click"
					>
						<div className="cursor-pointer flex items-center gap-2 font-medium">
							<span className="text-gray-800">
								Welcome, {loginuser?.username}
							</span>
							<FaUserCircle size={24} className="text-gray-500" />
						</div>
					</Tippy>
				)}
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="absolute z-10 top-[75px] left-0 w-full bg-white shadow-md p-5 flex flex-col gap-5 md:hidden">
					<ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
						<div>
							<Link to="/wishlist" className="">
								<div className="pl-3 flex items-center gap-5">
									<FaRegHeart className="" /> Wishlist
								</div>
							</Link>
							<Link
								to="/cart"
								className="flex items-center gap-2"
							>
								<CartIcon /> Cart
							</Link>
							{!isLogin ? (
								<button
									onClick={openModal}
									className="w-full bg-blue-500 text-white h-8 rounded-md px-3"
								>
									Login
								</button>
							) : (
								<div
									onClick={logout}
									className="cursor-pointer flex items-center gap-2 py-2 px-3 hover:bg-red-100 text-red-600 rounded-md"
								>
									<TbLogout />
									Log out
								</div>
							)}
						</div>
					</ClickAwayListener>
				</div>
			)}

			{/* Modal */}
			<CustomModal
				isOpen={isModalOpen}
				onClose={closeModal}
				title="Custom Modal"
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
