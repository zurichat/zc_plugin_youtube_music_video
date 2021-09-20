import { toast } from "react-toastify";

const log = {
  success: (message: string) =>
    toast.success(message, {
      style: {
        background: "hsla(160, 100%, 36%, 1)",
      },
    }),

  error: (message: string) => toast.error(message),
};

export default log;
