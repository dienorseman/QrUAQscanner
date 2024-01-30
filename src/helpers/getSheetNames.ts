import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { store } from '../store/store';
import { QrState, setLoading, setSpreadsheetPages } from '../store/qr/qrSlice';


export const getSheetNames = (dispatch: typeof store.dispatch) => {
    const sheetsId = useSelector((state: QrState) => state.sheetsId); // Obtiene el ID de la hoja de cálculo del estado de Redux

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
