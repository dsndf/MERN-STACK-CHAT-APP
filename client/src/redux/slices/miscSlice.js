import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedGroup: {},
  isGroupSelected: false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload?.group;
      state.isGroupSelected = action.payload?.isSelected;
    },
  },
});
export const { setSelectedGroup } = miscSlice.actions;
export default miscSlice;
