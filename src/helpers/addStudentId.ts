import axios from 'axios';
import qrSlice, { addTemporalStudentId, addpendingExpediente } from '../store/qr/qrSlice'; 
import { store } from '../store/store';
import { SpreadsheetSelector } from '../components';

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

  if(store.getState().qr.online && sheetsId){
    axios.get(readUrl, { headers }) // Leer todos los expedientes existentes
    .then((res) => {
      const exps=res.data.expedientes.map((item: string[]) => item[0]).filter((item: string) => item !== '');
      console.log("EXPEDIENTES 1: " + exps);
      console.log("Texto: " + text);
      var num = 0;
      num = parseInt(text);
      if (exps) {
        if (exps.includes(num)) {
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
  } else {
    const exps = store.getState().qr.temporalStundetIds.map(Item => String(Item));
    const pendingExps = store.getState().qr.expedientesPormandar.map(Item => String(Item));
    if(exps.includes(text)){
      console.error("Ya se registró ese expediente anteriormente");
    }else{
      dispatch(addTemporalStudentId(text));
      if(!pendingExps.includes(text)){
        dispatch(addpendingExpediente(text));
      }else{
        console.error("Ya se registró ese expediente anteriormente");
      }
    }
  };
}
  

