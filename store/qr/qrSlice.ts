import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QrState {
  online: boolean | null;
  unsentPayload: boolean;
  expedientesPormandar: Array<string>;
  currentSpreadsheetPage: string;
}

const initialState: QrState = {
  online: null,
  unsentPayload: false,
  expedientesPormandar: [],
  currentSpreadsheetPage: ''
};

export const qrSlice = createSlice({
  name: "qr",
  initialState,
  reducers: {
    switchOnline: ( state: QrState, action: PayloadAction<boolean> ) => {
      return {
        ...state,
        online: action.payload
      }
    },
    addpendingExpediente: ( state: QrState, action: PayloadAction<string> ) => {
      return {
        ...state,
        expedientesPormandar: [...state.expedientesPormandar, action.payload],
        unsentPayload: true,
      };
    },
    removependingExpediente: ( state: QrState, action: PayloadAction<string> ) => {
      return {
        ...state,
        expedientesPormandar: state.expedientesPormandar.filter(
          (expediente) => expediente !== action.payload
        ),
        unsentPayload: state.expedientesPormandar.length > 0,
      };
    },
    selectSpreadsheetPage: ( state:QrState, action: PayloadAction<string> ) => {
      return {
        ...state,
        currentSpreadsheetPage: action.payload,
      }
    }
  },
});

export const { switchOnline, addpendingExpediente, removependingExpediente, selectSpreadsheetPage } = qrSlice.actions;
export default qrSlice.reducer;
