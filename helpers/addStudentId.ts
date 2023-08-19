import axios from 'axios';

import { addTemporalStudentId, addpendingExpediente } from '../store/qr/qrSlice'; 
import { store } from '../store/store';


const sheetsId = '17GgGhd3K5inEx3JPk50Yboi3tv8AR6IOKCILlEoSbKo';
const addUrl =
  'https://script.google.com/macros/s/AKfycbxn6CT_xQ4mnDub7ld1BX_1UT2xcbhmAy_tu-qvT5cbhuYj5w2rcwjxGU6ubMOcOeEc/exec';

export const addStudentId = (text: string, dispatch: typeof store.dispatch, currentSpreadsheetPage: string) => {


  const requestData = {
    spreadsheetId: sheetsId,
    sheet: currentSpreadsheetPage,
    rows: [[text]],
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  axios
    .post(addUrl, requestData, { headers })
    .then((res) => {
      console.log(res.status);
      dispatch(addTemporalStudentId(text));
    })
    .catch((e) => {
      console.error('Error:', e);
      dispatch(addpendingExpediente(text));
      dispatch(addTemporalStudentId(text));
    });
};
