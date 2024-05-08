import { useEffect } from "react";
import toast from "react-hot-toast";

export const useErrors = (...errors) => {
  useEffect(() => {
    for (let { isError, error, state } of errors) {
      if (isError) {
        toast.error(error?.data?.message);
        state.reset();
      }
    }
  }, [...errors]);
};
