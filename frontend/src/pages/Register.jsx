import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ChatLogoIcon, CreateAccountIcon } from "../assets/ComponentsSVG";
import { register } from "../httpRequests/requests";
import { useEffect } from "react";

export const Register = () => {
	const [inputValues, setInputValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isSendingRequest, setIsSendingRequest] = useState(false);
	const navigateTo = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("chat-user")) navigateTo("/");
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// * Validaciones de nombre, email, etc.
		if (inputValues.username.length <= 3) {
			toast.error("Enter a valid username", {
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

		if (inputValues.email.length >= 50) {
			toast.error("Enter an shorter email", {
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
			toast.error("Enter a bigger password", {
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

		if (inputValues.password !== inputValues.confirmPassword) {
			toast.error("Confirm the same password", {
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
		// * Finish validations
		setIsSendingRequest(true);
		const createdUser = await register(inputValues);

		if (createdUser.status) {
			toast.success("User created successful", {
				position: "bottom-left",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			const stringifyUser = JSON.stringify(createdUser.user.createdUser);
			localStorage.setItem("chat-user", stringifyUser);
			navigateTo("/login");
		} else {
			toast.error("An error has occurred", {
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
					className="flex flex-col gap-y-5 my-8 items-center text-lg w-full">
					<input
						type="text"
						name="username"
						onChange={handleChange}
						placeholder="Username"
						className="bg-transparent outline-none pt-1 border-b-2 border-darkLight w-full max-w-sm focus:border-sky-500 transition-colors duration-150 placeholder:italic"
						autoComplete="off"
					/>

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

					<input
						type="password"
						name="confirmPassword"
						onChange={handleChange}
						placeholder="Confirm Password"
						className="bg-transparent outline-none pt-1 border-b-2 border-darkLight w-full max-w-sm focus:border-sky-500 transition-colors duration-150 placeholder:italic"
						autoComplete="off"
					/>

					<button
						type="submit"
						disabled={isSendingRequest}
						className="flex items-center px-3 py-1 disabled:opacity-30">
						<picture className="h-7 w-7">
							<CreateAccountIcon />
						</picture>
						<strong className="text-sky-500 shortSize">Create Account</strong>
					</button>
				</form>

				<nav className="py-2">
					<p className="text-xl text-center font-semibold">
						Already have an account ?{" | "}
						<Link to={"/login"} className="text-sky-500 font-bold">
							Login
						</Link>
					</p>
				</nav>
			</div>
		</div>
	);
};
