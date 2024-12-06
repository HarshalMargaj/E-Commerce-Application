import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const initialUser = { username: "", email: "", password: "" };
	const [user, setUser] = useState(initialUser);
	console.log(user);
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

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

	return (
		<div className="form-container">
			<h1>Create an Account</h1>
			<form className="form" onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					placeholder="Enter your username"
					name="username"
					value={user.username}
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="Enter your email"
					name="email"
					value={user.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Enter your password"
					name="password"
					value={user.password}
					onChange={handleChange}
				/>
			</form>
			<button
				onClick={handleSignUp}
				className="auth-button"
				disabled={isButtonDisabled}
			>
				Sign Up
			</button>

			{successMessage && (
				<p className="success-message">{successMessage}</p>
			)}

			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default SignUp;
