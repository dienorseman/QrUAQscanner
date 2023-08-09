import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QrState {
  online: null | boolean;
  unSentPayload: boolean;
  expedientesPormandar: Array<number>;
}

const initialState: QrState = {
  online: null,
  unSentPayload: false,
  expedientesPormandar: []
};

export const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
    switchOnline: (state, action: PayloadAction<boolean>) => {
      state.online = action.payload;
    },
  },
});

export const { switchOnline } = qrSlice.actions;
export default qrSlice.reducer;
