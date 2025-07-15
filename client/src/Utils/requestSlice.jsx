import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    acceptRequest: (state, action) => action.payload, //add request
    rejectRequest: (state, action) => {
      //remove request
      const newArray = state.filter((item) => item?._id !== action.payload);

      return newArray;
    },
  },
});

export const { acceptRequest, rejectRequest } = requestSlice.actions;
export default requestSlice.reducer;
