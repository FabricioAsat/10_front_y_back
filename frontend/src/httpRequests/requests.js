import axios from "axios";

export const register = async (body) => {
	try {
		const { data } = await axios.post("http://localhost:4096/api/auth/register", body);
		return { status: true, user: data };
	} catch (err) {
		console.error(err.message);
		return { status: false, user: null };
	}
};

export const login = async (body) => {
	try {
		const { data } = await axios.post("http://localhost:4096/api/auth/login", body);
		return { status: true, user: data };
	} catch (err) {
		console.error(err.message);
		return { status: false, user: null };
	}
};

export const setAvatar = async (id, image) => {
	try {
		const { data } = await axios.put(`http://localhost:4096/api/auth/setavatar/${id}`, image);
		return { status: true, user: data };
	} catch (err) {
		console.error(err.message);
		return { status: false, user: null };
	}
};

export const getAllContacts = async (id) => {
	try {
		const { data } = await axios.get(`http://localhost:4096/api/auth/users/${id}`);
		return { status: true, users: data };
	} catch (err) {
		console.error(err.message);
		return { status: false, users: null };
	}
};

export const addMessage = async (body) => {
	try {
		const { data } = await axios.post(`http://localhost:4096/api/messages/addmessage`, body);
		return { status: true, data: data };
	} catch (err) {
		console.error(err.message);
		return { status: false, data: null };
	}
};

export const getAllMessages = async (body) => {
	try {
		const { data } = await axios.post(`http://localhost:4096/api/messages/getallmessage`, body);
		return { status: true, data: data };
	} catch (err) {
		console.error(err.message);
		return { status: false, data: null };
	}
};
