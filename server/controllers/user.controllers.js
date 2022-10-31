import User from "../models/user.model.js";
import encrypt from "bcrypt";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const emailCheck = await User.findOne({ email });

		if (!!emailCheck) throw new Error({ message: "Email already used", status: 400 });
		if (!emailVerificator(email)) throw new Error({ message: "Invalid email", status: 400 });

		const hashedPassword = await encrypt.hash(password, 10);
		const user = await User.create({
			email: email.toLowerCase(),
			username,
			password: hashedPassword,
		});

		delete user.password;

		return res
			.status(200)
			.send({ status: 200, message: "User created successful", createdUser: user });
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 400).send({ message: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user) throw new Error({ message: "Incorrect email", status: 400 });
		const isPasswordValid = await encrypt.compare(password, user.password);
		if (!isPasswordValid) throw new Error({ message: "Incorrect password", status: 400 });

		delete user.password;
		return res.status(200).send({ status: 200, message: "login successful", user });
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 400).send({ message: err.message });
	}
};

export const setAvatar = async (req, res) => {
	try {
		const { id } = req.params;
		const { image } = req.body;

		const user = await User.findByIdAndUpdate(
			id,
			{ isAvatarImageSet: true, userAvatar: image },
			{ new: true }
		);

		return res.status(200).send({ status: 200, message: "login successful", user });
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 404).send({ message: err.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const { id } = req.params;
		const users = await User.find({ _id: { $ne: id } }).select([
			"username",
			"email",
			"userAvatar",
			"_id",
		]);

		return res.status(200).send(users);
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 404).send({ message: err.message });
	}
};

// TODO - Función para validar correos, etc
function emailVerificator(email) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
