import axios from 'axios';
import { store } from '../store/store';
import { setLoading, setSpreadsheetPages } from '../store/qr/qrSlice';

const sheets_id = '1ZS1HsrNPJF2l8DIxVM6_6aQJ8E6iEXlR0tbN3teKiUE';

const getDataUrl =
    'https://script.google.com/macros/s/AKfycbyZWqsMPVumZDOjfUEXbUrApiwty7jpGPKomBMBTBGijPbAqDPuJtJ7kp3whoU9H_IU/exec?spreadsheetId=' +
    sheets_id +
    '&sheets=names';

export const getSheetNames = (dispatch: typeof store.dispatch) => {
    dispatch(setLoading(true));
    axios
        .get(getDataUrl)
        .then((res) => {
            // console.log(res.data.sheetNames);
            dispatch(setSpreadsheetPages(res.data.sheetNames));
        })
        .catch((err) => {
            console.log(err);
        });
    dispatch(setLoading(false));
};
