import { useDispatch, useSelector } from "react-redux";

export const useDispatchAndSelector = (reducerName) => {
  const state = useSelector((state) => state[reducerName]);
  const dispatch = useDispatch();
  return { dispatch, state };
};
