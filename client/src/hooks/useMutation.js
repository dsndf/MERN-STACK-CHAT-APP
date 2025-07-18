import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useMutation = ({ hook, loadingMessage, onSuccess, fallback }) => {
  const [executeMutation, mutationState] = hook();
  const executeMutationHandler = async (arg) => {
    const tid = toast.loading(loadingMessage || "Updating data...");
    try {
      const { data, error } = await executeMutation(arg);
      console.log(error);
      if (error) toast.error(error.data?.message, { id: tid });
      else toast.success(data.message, { id: tid });
      if (!error && onSuccess) onSuccess();
      else if (error && fallback) fallback();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log("mutation executed");
    }
  };

  return executeMutationHandler;
};
