import { toast } from "react-toastify";

const log = {
	error: error => {
		const m = typeof error === "object" ? error.message : error;
		toast.error(m);
		console.log(m);
	}
};

export default log;
