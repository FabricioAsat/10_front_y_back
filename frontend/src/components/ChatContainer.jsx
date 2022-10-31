import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../assets/ComponentsSVG";
import { Chat } from "./Chat";
import { ChatInput } from "./ChatInput";
import { io } from "socket.io-client";

export const ChatContainer = ({ currentContact, currentUser }) => {
	const [messages, setMessages] = useState([]);
	const socket = useRef();
	const navigateTo = useNavigate();

	function handleLogout() {
		localStorage.clear();
		navigateTo("/login");
	}

	useEffect(() => {
		if (!currentUser) return;
		socket.current = io("http://localhost:4096");
		socket.current.emit("add-user", currentUser._id);
	}, [currentUser, currentContact]);

	return (
		<>
			<div className="flex flex-col h-full w-full border-l-2 border-darkLight overflow-y-auto">
				<article className="flex items-center justify-between w-full border-b-2 border-darkLight pr-10">
					<span className="flex gap-x-4 items-center py-5 px-3 bg-darkDark">
						<picture className="w-20 h-14">
							<img
								src={`data:image/svg+xml;base64,${currentContact.userAvatar}`}
								alt="User Avatar"
								className="w-14 h-14 mx-auto"
							/>
						</picture>

						<span className="flex flex-col items-center justify-center mx-auto">
							<p className="text-xl font-bold truncate max-w-[200px]">
								<strong className="text-center text-sky-500">{currentContact.username}</strong>
							</p>
							<p className="text-sm italic font-light truncate max-w-[200px]">
								<small className="text-center text-lightLight">{currentContact._id}</small>
							</p>
						</span>
					</span>

					<span>
						<button onClick={handleLogout} className="flex items-center gap-x-2 px-2 py-2">
							<picture className="h-7 w-7">
								<LogoutIcon />
							</picture>
							<strong className="text-sky-500 text-xl">Logout</strong>
						</button>
					</span>
				</article>

				<Chat
					currentContact={currentContact}
					currentUser={currentUser}
					messages={messages}
					setMessages={setMessages}
				/>

				<ChatInput
					currentContact={currentContact}
					currentUser={currentUser}
					socket={socket}
					messages={messages}
					setMessages={setMessages}
				/>
			</div>
		</>
	);
};
