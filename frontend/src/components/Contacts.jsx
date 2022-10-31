import unknownImage from "../assets/unknown.svg";
import { useEffect } from "react";
import { useState } from "react";

export const Contacts = ({ contacts, currentUser, setCurrentContact }) => {
	const [currentUsername, setCurrentUsername] = useState("");
	const [currentUserAvatar, setCurrentUserAvatar] = useState("");
	const [currentUserId, setCurrentUserId] = useState("");
	const [contactSelected, setContactSelected] = useState(null);

	function handleChangeContact(contact, index) {
		setCurrentContact(contact);
		setContactSelected(index);
	}

	useEffect(() => {
		if (!currentUser) return;
		setCurrentUserAvatar(currentUser.userAvatar);
		setCurrentUsername(currentUser.username);
		setCurrentUserId(currentUser._id);
	}, [currentUser]);

	return (
		<div className="flex flex-col overflow-y-auto scroll">
			<span className="flex gap-x-4 items-center py-5 px-3 bg-darkDark border-b-2 border-darkLight mb-4">
				<picture className="w-20 h-14">
					<img
						src={`data:image/svg+xml;base64,${currentUserAvatar}`}
						alt="User Avatar"
						className="w-14 h-14 mx-auto"
					/>
				</picture>

				<span className="flex flex-col items-center justify-center mx-auto">
					<p className="text-xl font-bold truncate max-w-[200px]">
						<strong className="text-center text-sky-500">{currentUsername}</strong>
					</p>
					<p className="text-sm italic font-light truncate max-w-[200px]">
						<small className="text-center text-lightLight">{currentUserId}</small>
					</p>
				</span>
			</span>

			<div className="flex flex-col gap-y-2 bg-darkDark px-2 pb-4 select-none overflow-y-auto scroll">
				{contacts.map((contact, index) => (
					<span
						key={index}
						onClick={() => handleChangeContact(contact, index)}
						className={`flex gap-x-4 items-center py-4 px-3 bg-darkLight/50 rounded-lg cursor-pointer transition-colors duration-200 ${
							contactSelected === index ? "bg-lightLight/10" : ""
						}`}>
						<picture
							className={`w-16 h-14 transition-all duration-200 ${
								contactSelected === index ? "brightness-125" : "brightness-75"
							}`}>
							{!!contact.userAvatar ? (
								<img
									src={`data:image/svg+xml;base64,${contact.userAvatar}`}
									alt="User Avatar"
									className="w-14 h-14"
								/>
							) : (
								<img src={unknownImage} alt="Unknown Avatar" className="w-14 h-14" />
							)}
						</picture>

						<span className="flex flex-col items-center justify-center">
							<p className="text-lg font-bold truncate max-w-[200px]">
								<strong
									className={`transition-colors duration-200 ${
										contactSelected === index ? "text-sky-500" : "text-lightLight/90"
									}`}>
									{contact.username}
								</strong>
							</p>
						</span>
					</span>
				))}
			</div>
		</div>
	);
};
