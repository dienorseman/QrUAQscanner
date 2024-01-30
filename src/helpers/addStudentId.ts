import axios from 'axios';
import { addTemporalStudentId, addpendingExpediente } from '../store/qr/qrSlice'; 
import { store } from '../store/store';

export const addStudentId = (text: string, dispatch: typeof store.dispatch, currentSpreadsheetPage: string) => {

  const sheetsId = store.getState().qr.sheetsId;
  const addUrl = 'https://script.google.com/macros/s/AKfycbyZWqsMPVumZDOjfUEXbUrApiwty7jpGPKomBMBTBGijPbAqDPuJtJ7kp3whoU9H_IU/exec';

  const requestData = {
    spreadsheetId: sheetsId,
    sheet: currentSpreadsheetPage,
    rows: [[text]],
  };

  const readUrl = `${addUrl}?spreadsheetId=${sheetsId}&sheets=expedientes&sheetName=${currentSpreadsheetPage}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  axios.get(readUrl, { headers }) // Leer todos los expedientes existentes
    .then((res) => {
      // console.log(res.data);
      if (res.data && res.data.expedientes) {
        const expedientes = res.data.expedientes; // asumiendo que res.data.expedientes es una lista de expedientes
        if (expedientes.includes(text)) {
          console.log("Ya se registró ese expediente anteriormente");
        } else {
          axios.post(addUrl, requestData, { headers }) // Agregar el nuevo expediente solo si no existe
            .then((res) => {
              console.log(res.status);
              dispatch(addTemporalStudentId(text));
            })
            .catch((e) => {
              console.error('Error:', e);
              dispatch(addpendingExpediente(text));
              dispatch(addTemporalStudentId(text));
            });
        }
      } else {
        console.error('Error: La respuesta de la API no contiene expedientes');
      }
    })
    .catch((e) => {
      console.error('Error:', e);
    });
};

