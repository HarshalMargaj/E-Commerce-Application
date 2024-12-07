import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setIsClickedOnSignup }) => {
	const initialUser = { username: "", email: "", password: "" };
	const [user, setUser] = useState(initialUser);
	console.log(user);
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
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

	const handleSignUp = async () => {
		setIsSubmitted(true);
		if (!user.username || !user.email || !user.password) return;
		try {
			const response = await axios.post(
				"http://localhost:1337/api/auth/local/register",
				{
					username: user.username,
					email: user.email,
					password: user.password,
				}
			);

			const { user: registeredUser, jwt } = response.data;
			sessionStorage.setItem("user", JSON.stringify(response.data.user));
			sessionStorage.setItem("jwt", response.data.jwt);

			setUser(initialUser);
			setSuccessMessage(
				`Account created successfully! Welcome, ${registeredUser.username}!`
			);
			console.log(jwt);
			setError(null);
			navigate("/");
		} catch (err) {
			setError(
				err.response?.data?.error?.message ||
					"Registration failed. Please try again."
			);
			setSuccessMessage(null);
		}
	};

	const isButtonDisabled = !user.username || !user.email || !user.password;

	const getInputClass = field => {
		return isSubmitted && !user[field]
			? "p-3 border rounded-md border-red-500"
			: "p-3 border rounded-md";
	};

	return (
		<div className="p-5 flex flex-col gap-5">
			<h1 className="text-blue-500 mb-5 font-medium text-2xl text-center">
				Create a new account
			</h1>
			<form
				className="flex flex-col gap-5"
				onSubmit={e => e.preventDefault()}
			>
				<label htmlFor="" className="text-gray-600 font-medium">
					Username
				</label>
				<input
					type="text"
					placeholder="Enter your username"
					name="username"
					value={user.username}
					onChange={handleChange}
					required
					className={getInputClass("username")}
				/>
				<label htmlFor="" className="text-gray-600 font-medium">
					Email
				</label>
				<input
					type="email"
					placeholder="Enter your email"
					name="email"
					value={user.email}
					onChange={handleChange}
					className={getInputClass("email")}
					required
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
					className={getInputClass("password")}
					required
				/>
			</form>
			<div className="text-sm text-gray-500">
				We prioritize your security. Your personal information is never
				shared without your consent.
			</div>
			<button
				onClick={handleSignUp}
				className={`bg-blue-500 text-white h-8 rounded-md ${
					isButtonDisabled ? "bg-opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isButtonDisabled}
			>
				Sign Up
			</button>
			<div className="flex items-center gap-2">
				Already have an account?
				<button
					className="text-blue-500"
					onClick={() => setIsClickedOnSignup(false)}
				>
					Sign In
				</button>
			</div>

			{successMessage && (
				<p className="success-message">{successMessage}</p>
			)}

			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default SignUp;
