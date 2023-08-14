import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QrState {
  online: null | boolean;
  unsentPayload: boolean;
  expedientesPormandar: Array<string>;
}

const initialState: QrState = {
  online: null,
  unsentPayload: false,
  expedientesPormandar: [],
};

export const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
    switchOnline: (state, action: PayloadAction<boolean>) => {
      state.online = action.payload;
    },
    addpendingExpediente: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        expedientesPormandar: [...state.expedientesPormandar, action.payload],
        unsentPayload: true,
      };
    },
    removependingExpediente: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        expedientesPormandar: state.expedientesPormandar.filter(
          (expediente) => expediente !== action.payload
        ),
        unsentPayload: state.expedientesPormandar.length > 0,
      };
    },
  },
});

export const { switchOnline, addpendingExpediente, removependingExpediente } = qrSlice.actions;
export default qrSlice.reducer;
