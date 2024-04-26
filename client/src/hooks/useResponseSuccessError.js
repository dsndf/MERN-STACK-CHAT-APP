import { useEffect } from "react";
import toast from "react-hot-toast";

export const useResponseSuccessError = (...responses) => {
  useEffect(() => {
    let successResponses = responses.filter((response) => response.isSuccess);
    let errorResponses = responses.filter((response) => response.isError);
    if (successResponses.length) {
      for (let response of successResponses) {
        let toastSuccessMessage = response?.data?.message;
        if (toastSuccessMessage) toast.success(toastSuccessMessage);
      }
    }
    if (errorResponses.length) {
      for (let response of errorResponses) {
        let toastErrorMessage = response?.error?.data?.message;
        if (toastErrorMessage) toast.error(toastErrorMessage);
      }
    }
  }, [...responses]);
};
