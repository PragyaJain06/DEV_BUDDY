import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      console.log(state.items, "statet");
      const newArray = state.filter((item) => {
        console.log(item, "itemmmmmmmmmm");
        return item?._id !== action.payload;
      });
      return newArray;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
