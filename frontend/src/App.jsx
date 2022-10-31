import { ChatappRouter } from "./router/Chatapp.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<ToastContainer />
			<ChatappRouter />
		</>
	);
}

export default App;
