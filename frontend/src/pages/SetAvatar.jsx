import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReloadIcon } from "../assets/ComponentsSVG";
import { setAvatar } from "../httpRequests/requests";

const api = "https://api.multiavatar.com";

export const SetAvatar = () => {
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selected, setSelected] = useState(0);
	const [reaload, setReaload] = useState(true);

	const navigateTo = useNavigate();

	const setProfilePicture = async () => {
		const user = await JSON.parse(localStorage.getItem("chat-user"));
		const updatedUser = await setAvatar(user._id, { image: avatars[selected] });

		if (updatedUser.status) {
			user.isAvatarImageSet = true;
			user.userAvatar = updatedUser.user.user.userAvatar;
			localStorage.setItem("chat-user", JSON.stringify(user));
			navigateTo("/");
		} else {
			toast.error("Error, please try again.", {
				position: "bottom-left",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};

	useEffect(() => {
		setIsLoading(true);
		const allImages = [];
		async function getAllImages() {
			for (let i = 0; i < 5; i++) {
				try {
					const image = await axios.get(`${api}/${Math.round(Math.random() * 100000)}`);
					const buffer = new Buffer(image.data);
					allImages.push(buffer.toString("base64"));
					setAvatars(allImages);
				} catch (error) {}
			}
			setIsLoading(false);
		}
		getAllImages();
	}, [reaload]);

	useEffect(() => {
		if (!localStorage.getItem("chat-user")) navigateTo("/login");
	}, []);

	return (
		<div className="flex flex-col gap-y-5 py-10">
			<h2 className="font-bold longSize text-center">
				Select your favorite <b className="font-bold text-sky-500">avatar</b>
			</h2>

			<picture className="flex items-center justify-center gap-x-10 gap-y-5 flex-wrap px-4 py-4">
				{isLoading ? (
					<div className="border-4 rounded-full border-t-sky-500 animate-spin w-12 h-12 my-4"></div>
				) : (
					avatars.map((image, index) => (
						<img
							key={index}
							src={`data:image/svg+xml;base64,${image}`}
							alt="image"
							onClick={() => setSelected(index)}
							className={`h-20 w-20 p-1 rounded-full ${
								index === selected ? "border-4 border-sky-500/75" : ""
							}`}
						/>
					))
				)}
			</picture>

			<span className="flex justify-center gap-x-4 text-xl">
				<button
					onClick={() => setReaload(!reaload)}
					className="flex items-center px-2 py-1rounded-md">
					<picture className="w-7 h-7">
						<ReloadIcon />
					</picture>
					<small className="text-xl">Reload</small>
				</button>

				<button
					onClick={setProfilePicture}
					className="bg-sky-500 text-darkDark font-bold px-2 py-1 rounded-md">
					Select!!
				</button>
			</span>
		</div>
	);
};
