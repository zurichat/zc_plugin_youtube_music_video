import { toast } from "react-toastify";

export const success = (message: string) => {
  // toast.success(message, {
  //   style: {
  //     background: "hsla(160, 100%, 36%, 1)",
  //   },
  // });
};

export const error = (message: string) => {
  // toast.error(message);
};

const log = {
  success,
  error,
};

export default log;
