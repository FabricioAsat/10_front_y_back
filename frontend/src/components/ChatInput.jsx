import { useEffect, useState } from "react";
import { SendIcon } from "../assets/ComponentsSVG";
import { addMessage } from "../httpRequests/requests";

export const ChatInput = ({ currentContact, currentUser, socket, messages, setMessages }) => {
	const [message, setMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!message.trim()) return;
		await addMessage({
			from: currentUser._id,
			to: currentContact._id,
			message: message,
		});

		socket.current.emit("send-msg", {
			to: currentContact._id,
			from: currentUser._id,
			message: message,
		});

		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: message });
		setMessages(msgs);

		setMessage("");
	}

	useEffect(() => {
		if (!socket.current) return;
		socket.current.on("msg-recieved", (msg) => {
			setArrivalMessage({ fromSelf: false, message: msg });
		});
	});

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	return (
		<form className="flex py-2 border-t-4 border-darkLight" onSubmit={handleSubmit}>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				name="message"
				placeholder="Type your message"
				autoComplete="off"
				className="outline-none w-full placeholder:italic resize-none scroll ml-4 bg-darkLight rounded-md px-4 py-2 text-base max-h-12"
			/>

			<button type="submit" className="text-darkDark disabled:opacity-30 h-full w-7 mx-4">
				<SendIcon />
			</button>
		</form>
	);
};
