import messagesModel from "../models/messages.model.js";

export const addMessage = async (req, res) => {
	try {
		const { from, to, message } = req.body;
		const data = await messagesModel.create({
			message: { text: message },
			users: [from, to],
			sender: from,
		});
		if (!!data) return res.status(200).send({ message: "Message created successful" });
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 400).send({ message: err.message });
	}
};

export const getAllMessages = async (req, res) => {
	try {
		const { from, to } = req.body;
		const messages = await messagesModel
			.find({ users: { $all: [from, to] } })
			.sort({ updatedAt: 1 });

		const projectMessages = messages.map((msg) => {
			return { fromSelf: msg.sender.toString() === from, message: msg.message.text };
		});

		return res.status(200).send(projectMessages);
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 400).send({ message: err.message });
	}
};
