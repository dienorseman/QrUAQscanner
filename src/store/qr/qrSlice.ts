import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QrState {
  online: boolean | null;
  unsentPayload: boolean;
  expedientesPormandar: Array<string>;
  temporalStundetIds: Array<string>;
  currentSpreadsheetPage: string;
  temporalSpreadSheetPage: string;
  spreadsheetPages: Array<string>;
  loading: boolean;
  sheetsId: string;
  sheetsTitle: string;
  columnAData: Array<string>;
}

const initialState: QrState = {
  sheetsId: '',
  online: null,
  unsentPayload: false,
  expedientesPormandar: [],
  currentSpreadsheetPage: '',
  temporalSpreadSheetPage:'',
  temporalStundetIds: [],
  spreadsheetPages: [],
  loading: false,
  sheetsTitle: '',
  columnAData: [],
};

export const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setColumnAData: (state: QrState, action: PayloadAction<string[]>) => {
      return{
        ...state,
        columnAData: action.payload,
        unsentPayload: true,
      };
    },
    setSheetsTitle: (state, action) => {
      state.sheetsTitle = action.payload; // Añade este reductor para manejar la actualización del titulo de la hoja de cálculo
    },
    setSheetsId: (state, action) => {
      state.sheetsId = action.payload; // Añade este reductor para manejar la actualización del ID de la hoja de cálculo
    },
    switchOnline: (state: QrState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        online: action.payload,
      };
    },
    addpendingExpediente: (state: QrState, action: PayloadAction<string>) => {
      return {
        ...state,
        expedientesPormandar: [...state.expedientesPormandar, action.payload],
        unsentPayload: true,
      };
    },
    removependingExpediente: (
      state: QrState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        expedientesPormandar: state.expedientesPormandar.filter(
          (expediente) => expediente !== action.payload
        ),
        unsentPayload: state.expedientesPormandar.length > 0,
      };
    },
    removeColumnAData: (
      state: QrState
    ) => {
      return{
        ...state,
        columnAData: [],
      };
    },
    selectSpreadsheetPage: (state: QrState, action: PayloadAction<string>) => {
      return {
        ...state,
        currentSpreadsheetPage: action.payload,
      };
    },
    addTemporalStudentId: (state: QrState, action: PayloadAction<string>) => {
      return {
        ...state,
        temporalStundetIds: [...state.temporalStundetIds, action.payload],
      };
    },
    clearTemporalStudentIds: (state: QrState) => {
      return {
        ...state,
        temporalStundetIds: [],
      };
    },
    setSpreadsheetPages: (state: QrState, action: PayloadAction<Array<string>>) => {
      return {
        ...state,
        spreadsheetPages: action.payload,
      };
    },
    clearSpreadsheetPages: (state: QrState) => {
      return{
        ...state,
        spreadsheetPages: [],
      }
    },
    setLoading: (state: QrState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    addTemporalSpreadSheet: (state: QrState, action: PayloadAction<string>) => {
      return{
        ...state,
        temporalSpreadSheetPage: action.payload,
      }
    },
  },

});

export const {
  setSheetsId,
  switchOnline,
  addpendingExpediente,
  removependingExpediente,
  removeColumnAData,
  selectSpreadsheetPage,
  addTemporalStudentId,
  addTemporalSpreadSheet,
  clearTemporalStudentIds,
  setSpreadsheetPages,
  setLoading,
  setSheetsTitle,
  setColumnAData,
  clearSpreadsheetPages,
} = qrSlice.actions;

export default qrSlice.reducer;
