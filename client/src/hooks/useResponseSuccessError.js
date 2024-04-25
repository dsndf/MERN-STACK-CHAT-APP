import { useEffect } from "react";
import toast from "react-hot-toast";

export const useResponseSuccessError = (...responses) => {
  useEffect(() => {
    let successResponses = responses.filter((response) => response.isSuccess);
    let errorResponses = responses.filter((response) => response.isError);
    if (successResponses.length) {
      for (let response of successResponses) {
        toast.success(response?.data?.message);
      }
    }
    if (errorResponses.length) {
      for (let response of errorResponses) {
        toast.error(response?.error?.data?.message);
      }
    }
  }, [...responses]);
};
