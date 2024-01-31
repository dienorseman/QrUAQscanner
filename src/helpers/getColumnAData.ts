import axios from 'axios';
import { store } from '../store/store'; // Importa tu store de Redux
import { setLoading, setColumnAData } from '../store/qr/qrSlice';

export const getColumnAData = (dispatch: typeof store.dispatch, sheetName: string) => {
    const sheetsId = store.getState().qr.sheetsId; // Obtiene el ID de la hoja de cálculo del estado de Redux
  
    const getDataUrl =
        'https://script.google.com/macros/s/AKfycbyZWqsMPVumZDOjfUEXbUrApiwty7jpGPKomBMBTBGijPbAqDPuJtJ7kp3whoU9H_IU/exec?spreadsheetId=' +
        sheetsId +
        '&sheets=' + sheetName + '!A:A';
        console.log(getDataUrl); 
  
    dispatch(setLoading(true));
    axios
      .get(getDataUrl)
      .then((res) => {
        dispatch(setColumnAData(res.data.columnAData)); // Despacha los datos de la columna A al estado de Redux
        console.log('Intentando obtener datos de: ');
        console.log(res.data.columnAData);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setLoading(false));
  };