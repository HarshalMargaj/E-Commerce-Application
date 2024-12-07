import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserCart, fetchUserWishlist } from "../../api/api";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../Redux/userSlice";
import { toast } from "react-hot-toast";

const Login = ({ setIsClickedOnSignup, setIsModalOpen }) => {
	const initialUser = { email: "", password: "" };
	const [user, setUser] = useState(initialUser);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setUser(prevUser => ({ ...prevUser, [name]: value }));
	};

	useEffect(() => {
		const jwt = sessionStorage.getItem("jwt");
		if (jwt) {
			navigate("/");
		}
	}, []);

	const handleLogin = async () => {
		setIsSubmitted(true);
		if (!user.email || !user.password) return;
		try {
			const response = await axios.post(
				"http://localhost:1337/api/auth/local",
				{
					identifier: user.email,
					password: user.password,
				}
			);

			const { jwt, user: loggedInUser } = response.data;
			sessionStorage.setItem("user", JSON.stringify(response.data.user));
			sessionStorage.setItem("jwt", response.data.jwt);

			setError(null);
			setUser(initialUser);
			dispatch(setLoggedInUser({ user: loggedInUser, token: jwt }));

			fetchUserCart(loggedInUser.id, jwt, dispatch);
			fetchUserWishlist(loggedInUser.id, jwt, dispatch);
			setIsModalOpen(false);
			toast.success("Welcome back! You have successfully signed in.");
			navigate("/");
		} catch (err) {
			setError(
				err.response?.data?.error?.message ||
					"Login failed. Please try again."
			);
			toast.error(
				"Login failed. Please check your credentials and try again."
			);
		}
	};

	const getInputClass = field => {
		return isSubmitted && !user[field]
			? "p-3 border rounded-md border-red-500"
			: "p-3 border rounded-md";
	};

	const handleSignUp = () => {
		setIsClickedOnSignup(true);
	};

	return (
		<div className="p-5 flex flex-col gap-5">
			<h1 className="text-blue-500 mb-5 font-medium text-2xl text-center">
				Welcome Back! Sign in to your account
			</h1>
			<form
				className="flex flex-col gap-5"
				onSubmit={e => e.preventDefault()}
			>
				<label htmlFor="" className="text-gray-600 font-medium">
					Email
				</label>
				<input
					type="email"
					placeholder="Enter your email"
					name="email"
					value={user.email}
					onChange={handleChange}
					required
					className={getInputClass("email")}
				/>
				<label htmlFor="" className="text-gray-600 font-medium">
					Password
				</label>
				<input
					type="password"
					placeholder="Enter your password"
					name="password"
					value={user.password}
					onChange={handleChange}
					className={getInputClass("email")}
					required
				/>
			</form>
			<div className="text-sm text-gray-500">
				We prioritize your security. Your personal information is never
				shared without your consent.
			</div>
			<button
				type="submit"
				onClick={handleLogin}
				className="bg-blue-500 text-white h-8 rounded-md"
			>
				Sign in
			</button>

			<div className="flex items-center gap-2">
				Dont have an account?
				{/* <Link to={"/signup"}> */}
				<button className="text-blue-500" onClick={handleSignUp}>
					Create an account
				</button>
				{/* </Link> */}
			</div>

			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default Login;
