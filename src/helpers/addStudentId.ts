import axios from 'axios';
import { addTemporalStudentId, addpendingExpediente, removependingExpediente, clearTemporalStudentIds,removeColumnAData } from '../store/qr/qrSlice'; 
import { store } from '../store/store';
import { useToast } from 'react-native-toast-notifications';

export const addStudentId = (text: string, dispatch: typeof store.dispatch, currentSpreadsheetPage: string) => {

  const temporalSpreadSheet = store.getState().qr.temporalSpreadSheetPage;
  const temporalStudents = store.getState().qr.temporalStundetIds;
  const pendingExps = store.getState().qr.expedientesPormandar;
  const columnAData = store.getState().qr.columnAData;
  const sheetsId = store.getState().qr.sheetsId;
  const addUrl = 'https://script.google.com/macros/s/AKfycbyZWqsMPVumZDOjfUEXbUrApiwty7jpGPKomBMBTBGijPbAqDPuJtJ7kp3whoU9H_IU/exec';

  const requestData = {
    spreadsheetId: sheetsId,
    sheet: currentSpreadsheetPage,
    rows: [[text]],
  };

  const tempRequestData = {
    spreadsheetId: sheetsId,
    sheet: temporalSpreadSheet,
    rows: [[text]],
  };

  const readUrl = `${addUrl}?spreadsheetId=${sheetsId}&sheets=expedientes&sheetName=${currentSpreadsheetPage}`;
  const tempUrl = `${addUrl}?spreadsheetId=${sheetsId}&sheets=expedientes&sheetName=${temporalSpreadSheet}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if(store.getState().qr.online && sheetsId && currentSpreadsheetPage && currentSpreadsheetPage != 'Offline'){
    axios.get(readUrl, { headers }) // Leer todos los expedientes existentes
    .then((res) => {
      const exps=res.data.expedientes.map((item: string[]) => item[0]).filter((item: string) => item !== '');
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
              dispatch(removependingExpediente(text));
              dispatch(clearTemporalStudentIds());
            })
            .catch((e) => {
              console.error('Error:', e);
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
    if(store.getState().qr.online && sheetsId && !currentSpreadsheetPage && temporalSpreadSheet){
      axios.get(tempUrl, { headers }) // Leer todos los expedientes existentes
      .then((res) => {
        const exps=res.data.expedientes.map((item: string[]) => item[0]).filter((item: string) => item !== '');
        var num = 0;
        num = parseInt(text);
        if (exps) {
          if (exps.includes(num)) {
            console.log("Ya se registró ese expediente anteriormente");
          } else {
            axios.post(addUrl, tempRequestData, { headers }) // Agregar el nuevo expediente solo si no existe
              .then((res) => {
                console.log(res.status);
                dispatch(addTemporalStudentId(text));
                dispatch(removependingExpediente(text));
                dispatch(clearTemporalStudentIds());
              })
              .catch((e) => {
                console.error('Error:', e);
              });
          }
        } else {
          console.error('Error: La respuesta de la API no contiene expedientes');
        }
      })
      .catch((e) => {
        console.error('Error:', e);
      });
    }else{
      const exps = store.getState().qr.temporalStundetIds.map(Item => String(Item));
      const pendingExps = store.getState().qr.expedientesPormandar.map(Item => String(Item));
      if(exps.includes(text)){
        console.error("Ya se registró ese expediente anteriormente");
      }else{
        dispatch(addTemporalStudentId(text));
        dispatch(removependingExpediente(text));
        dispatch(clearTemporalStudentIds());
        if(!pendingExps.includes(text)){
          dispatch(addpendingExpediente(text));
        }else{
          console.error("Ya se registró ese expediente anteriormente");
        }
      }
    }
  };
}
  

