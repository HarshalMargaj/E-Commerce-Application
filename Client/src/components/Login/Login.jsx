import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserCart } from "../../api/api";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../Redux/userSlice";

const Login = () => {
	const initialUser = { email: "", password: "" };
	const [user, setUser] = useState(initialUser);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
			navigate("/");
		} catch (err) {
			setError(
				err.response?.data?.error?.message ||
					"Login failed. Please try again."
			);
		}
	};

	return (
		<div className="form-container">
			<h1>Welcome to ShopVista</h1>
			<form className="form" onSubmit={e => e.preventDefault()}>
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
			<button onClick={handleLogin}>Login</button>

			<div>
				create an account
				<Link to={"/signup"}>
					<button>Sign up</button>
				</Link>
			</div>

			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default Login;
