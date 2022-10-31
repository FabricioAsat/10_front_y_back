import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const mongoConnection = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.info("Connection Successful");
	} catch (err) {
		console.error(err.message);
		process.exit();
	}
};
