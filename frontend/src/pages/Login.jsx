import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChatLogoIcon, LoginIcon } from "../assets/ComponentsSVG";
import { login } from "../httpRequests/requests";

export const Login = () => {
	const [inputValues, setInputValues] = useState({ email: "", password: "" });
	const [isSendingRequest, setIsSendingRequest] = useState(false);
	const navigateTo = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("chat-user")) navigateTo("/");
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// * Validaciones de nombre, email, etc.

		if (inputValues.email.length >= 50) {
			toast.error("Enter an valid email", {
				position: "bottom-left",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return;
		}

		if (inputValues.password.length < 8) {
			toast.error("Enter a valid password", {
				position: "bottom-left",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return;
		}

		setIsSendingRequest(true);
		const loginUser = await login(inputValues);

		if (loginUser.status) {
			toast.success("login successful", {
				position: "bottom-left",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			const stringifyUser = JSON.stringify(loginUser.user.user);
			localStorage.setItem("chat-user", stringifyUser);
			navigateTo("/");
		} else {
			toast.error("An error has occurred, try again.", {
				position: "bottom-left",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			setIsSendingRequest(false);
		}
	};

	function handleChange(e) {
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	}

	return (
		<div className="flex items-center justify-center h-full">
			<div className="flex flex-col items-center justify-center max-w-md bg-darkDark px-4 py-10 w-full rounded-xl shadow-lg shadow-darkDark/75">
				<span className="flex gap-x-3 items-center justify-center w-full">
					<picture className="h-8 w-8">
						<ChatLogoIcon />
					</picture>
					<h2 className="mediumSize font-bold">
						Start <b className="text-sky-500 font-bold">chatting</b>
					</h2>
				</span>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-y-5 my-7 items-center text-lg w-full">
					<input
						type="email"
						name="email"
						onChange={handleChange}
						placeholder="Email"
						className="bg-transparent outline-none pt-1 border-b-2 border-darkLight w-full max-w-sm focus:border-sky-500 transition-colors duration-150 placeholder:italic"
						autoComplete="off"
					/>

					<input
						type="password"
						name="password"
						onChange={handleChange}
						placeholder="Password"
						className="bg-transparent outline-none pt-1 border-b-2 border-darkLight w-full max-w-sm focus:border-sky-500 transition-colors duration-150 placeholder:italic"
						autoComplete="off"
					/>

					<button
						type="submit"
						disabled={isSendingRequest}
						className="flex items-center gap-x-2 px-3 py-1 disabled:opacity-30 ml-auto">
						<picture className="h-7 w-7">
							<LoginIcon />
						</picture>
						<strong className="text-sky-500 shortSize">Login</strong>
					</button>
				</form>

				<nav className="py-2">
					<p className="text-xl text-center font-semibold">
						Don't have an account yet ?{" | "}
						<Link to={"/register"} className="text-sky-500 font-bold">
							Register
						</Link>
					</p>
				</nav>
			</div>
		</div>
	);
};
