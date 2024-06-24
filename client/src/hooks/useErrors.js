import { useEffect } from "react";
import toast from "react-hot-toast";

export const useErrors = (errors = [], deps = []) => {
  useEffect(() => {
    errors.forEach(({ error, isError, fallback = null }) => {
      if (isError) {
        toast.error(error.data?.message);
        if (fallback && typeof fallback === "function") fallback();
      }
    });
  }, [...deps]);
};
