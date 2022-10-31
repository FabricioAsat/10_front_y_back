import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChatContainer } from "../components/ChatContainer";

import { Contacts } from "../components/Contacts";
import { Welcome } from "../components/Welcome";
import { getAllContacts } from "../httpRequests/requests";

export const Chat = () => {
	const navigateTo = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentContact, setCurrentContact] = useState(undefined);

	useEffect(() => {
		async function getData() {
			if (!currentUser) return;

			if (currentUser.isAvatarImageSet) {
				const res = await getAllContacts(currentUser._id);
				if (res.status) {
					setContacts(res.users);
				} else {
					toast.error("Error, try again.", {
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
			} else {
				navigateTo("/setAvatar");
			}
		}
		getData();
	}, [currentUser]);

	useEffect(() => {
		if (!localStorage.getItem("chat-user")) {
			navigateTo("/login");
		} else {
			setCurrentUser(JSON.parse(localStorage.getItem("chat-user")));
		}
	}, []);

	return (
		<div className="flex items-center justify-center h-screen py-5">
			<div className="grid grid-cols-3 lg:grid-cols-4 max-w-[1550px] w-full h-full max-h-full bg-darkDark">
				<Contacts
					contacts={contacts}
					currentUser={currentUser}
					setCurrentContact={setCurrentContact}
				/>

				<div className="flex flex-col items-center justify-center col-span-2 lg:col-span-3 overflow-y-auto">
					{!currentContact ? (
						<Welcome currentUser={currentUser} />
					) : (
						<ChatContainer currentContact={currentContact} currentUser={currentUser} />
					)}
				</div>
			</div>
		</div>
	);
};
