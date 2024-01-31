import axios from 'axios';
import { store } from '../store/store'; // Importa tu store de Redux
import { setLoading, setSheetsTitle } from '../store/qr/qrSlice'; // Importa la acción setSheetsTitle

export const getSheetTitle = (dispatch: typeof store.dispatch) => {
  const sheetsId = store.getState().qr.sheetsId; // Obtiene el ID de la hoja de cálculo del estado de Redux

  const getDataUrl =
    'https://script.google.com/macros/s/AKfycbyZWqsMPVumZDOjfUEXbUrApiwty7jpGPKomBMBTBGijPbAqDPuJtJ7kp3whoU9H_IU/exec?spreadsheetId=' +
    sheetsId +
    '&sheets=title'; 

  dispatch(setLoading(true));
  axios
    .get(getDataUrl)
    .then((res) => {
        console.log(res.data.title);
        dispatch(setSheetsTitle(res.data.title)); // Despacha la acción setSheetsTitle con el título de la hoja de cálculo
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

