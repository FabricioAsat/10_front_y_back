import welcomeImage from "../assets/welcome.png";

export const Welcome = ({ currentUser }) => {
	if (!currentUser)
		return <div className="h-20 w-20 border-4 border-t-sky-500 animate-spin rounded-full"></div>;

	return (
		<>
			<picture className="">
				<img src={welcomeImage} alt="Welcome Image" className="h-full max-h-96" />
			</picture>
			<span className="text-center">
				<h2 className="font-bold longSize">
					Welcome, <b className="text-sky-500 font-bold">{currentUser.username}</b>!
				</h2>
				<small className="font-medium lowMediumSize italic">
					Start chatting with someone, my friend.
				</small>
			</span>
		</>
	);
};
