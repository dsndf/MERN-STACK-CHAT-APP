import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../config/settings";
import { setLoading } from "../slices/authSlice";
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (passkey, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        server + "/admin/login",
        { passkey },
        { withCredentials: true }
      );
      return data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
export const adminVerifyAuth = createAsyncThunk("admin/verify", async () => {
  try {
    const { data } = await axios.get(server + "/admin/verify/auth", {
      withCredentials: true,
    });
    return data.success;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (p = null, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    try {
      const { data } = await axios.get(server + "/admin/logout", {
        withCredentials: true,
      });
      return data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
