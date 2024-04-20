import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createDispatchHook } from "react-redux";
import { server } from "../../config/settings";
const initialState = {
  user: {},
  isAuth: false,
  loading: false,
  err: "",
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAuthErr(state, action) {
      console.log({ action });
      state.err = action.payload;
      state.loading = false;
    },
    setAuthMessage(state, action) {
      state.message = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuthMessage, setLoading, setAuthErr, setUser, setIsAuth } =
  authSlice.actions;

// thunk;
export const loadUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${server}/user/profile`, {
        withCredentials: true,
      });
      console.log({ data });
      dispatch(setUser(data.profile));
      dispatch(setIsAuth(true));
    } catch (error) {
      if (error?.response) {
        console.log(error);
        dispatch(setAuthErr(error.response?.data?.message));
      }
      console.log(error.message);
    }
  };
};
export const registerUser = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(`${server}/user/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log({ data });
      dispatch(setUser(data.user));
      dispatch(setAuthMessage(data.message));
      dispatch(setIsAuth(true));
    } catch (error) {
      if (error?.response) {
        console.log(error);
        dispatch(setAuthErr(error.response?.data?.message));
      }
      console.log(error.message);
    }
  };
};
export const loginUser = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(`${server}/user/login`, formData, {
        withCredentials: true,
      });
      dispatch(setUser(data.user));
      dispatch(setIsAuth(true));
      dispatch(setAuthMessage(data.message));
    } catch (error) {
      if (error?.response) {
        console.log(error);
        dispatch(setAuthErr(error.response?.data?.message));
      }
      console.log(error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      dispatch(setUser({}));
      dispatch(setIsAuth(false));
      dispatch(setAuthMessage(data.message));
    } catch (error) {
      if (error?.response) {
        console.log(error);
        dispatch(setAuthErr(error.response?.data?.message));
      }
      console.log(error.message);
    }
  };
};
