import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error404 } from "../pages/Error404";
import { Chat } from "../pages/Chat";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { SetAvatar } from "../pages/SetAvatar";

export const ChatappRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/setAvatar" element={<SetAvatar />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Chat />} />

				<Route path="/*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	);
};
