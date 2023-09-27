import axios from 'axios';
import { store } from '../store/store';
import { setLoading, setSpreadsheetPages } from '../store/qr/qrSlice';

const sheets_id = '17GgGhd3K5inEx3JPk50Yboi3tv8AR6IOKCILlEoSbKo';

const getDataUrl =
    'https://script.google.com/macros/s/AKfycbxn6CT_xQ4mnDub7ld1BX_1UT2xcbhmAy_tu-qvT5cbhuYj5w2rcwjxGU6ubMOcOeEc/exec?spreadsheetId=' +
    sheets_id +
    '&sheets=names';

export const getSheetNames = (dispatch: typeof store.dispatch) => {
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
