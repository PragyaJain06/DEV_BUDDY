import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    // addConnection: (state, action) => {
    //   if (!state)
    //     return Array.isArray(action.payload)
    //       ? action.payload
    //       : [action.payload];

    //   const newConnections = Array.isArray(action.payload)
    //     ? action.payload
    //     : [action.payload];

    //   const filteredConnections = newConnections.filter(
    //     (newConn) =>
    //       !state.some((existingConn) => existingConn._id === newConn._id)
    //   );

    //   return [...state, ...filteredConnections];
    // },
    removeConnection: () => null,
    addConnection: (state, action) => action.payload,
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
