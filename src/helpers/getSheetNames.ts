import axios from 'axios';
import { store } from '../store/store'; // Importa tu store de Redux
import { setLoading, setSpreadsheetPages } from '../store/qr/qrSlice';

export const getSheetNames = (dispatch: typeof store.dispatch) => {
  const sheetsId = store.getState().qr.sheetsId; // Obtiene el ID de la hoja de cálculo del estado de Redux

  const getDataUrl =
    'https://script.google.com/macros/s/AKfycbyZWqsMPVumZDOjfUEXbUrApiwty7jpGPKomBMBTBGijPbAqDPuJtJ7kp3whoU9H_IU/exec?spreadsheetId=' +
    sheetsId +
    '&sheets=names';

  dispatch(setLoading(true));
  axios
    .get(getDataUrl)
    .then((res) => {
      dispatch(setSpreadsheetPages(res.data.sheetNames));
    })
    .catch((err) => {
      console.log(err);
    });
  dispatch(setLoading(false));
};
