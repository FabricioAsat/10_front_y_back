import { useRef } from "react";
import { useEffect } from "react";
import { getAllMessages } from "../httpRequests/requests";

export const Chat = ({ currentContact, currentUser, messages, setMessages }) => {
	const scrollRef = useRef();

	useEffect(() => {
		async function getData() {
			const response = await getAllMessages({ from: currentUser._id, to: currentContact._id });
			setMessages(response.data);
		}
		getData();
	}, [currentContact]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
	}, [messages]);

	return (
		<div className="h-full mx-2 p-5 overflow-y-auto scroll">
			<article className="flex flex-col gap-y-3 text-lightLight overflow-y-auto">
				{messages.map((msg, index) => (
					<span
						ref={scrollRef}
						key={String(Math.random())}
						className={`max-w-lg py-2 px-4 rounded-md text-base ${
							msg.fromSelf ? "italic ml-auto bg-sky-800" : "mr-auto bg-darkLight"
						}`}>
						<b>{msg.message}</b>
					</span>
				))}
			</article>
		</div>
	);
};
