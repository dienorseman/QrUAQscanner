import axios from "axios";

const sheets_id = "17GgGhd3K5inEx3JPk50Yboi3tv8AR6IOKCILlEoSbKo";
const addUrl = "https://script.google.com/macros/s/AKfycbxn6CT_xQ4mnDub7ld1BX_1UT2xcbhmAy_tu-qvT5cbhuYj5w2rcwjxGU6ubMOcOeEc/exec";
const getDataUrl = "https://script.google.com/macros/s/AKfycbxn6CT_xQ4mnDub7ld1BX_1UT2xcbhmAy_tu-qvT5cbhuYj5w2rcwjxGU6ubMOcOeEc/exec?spreadsheetId=" + sheets_id + "&sheets=names";


export const getSheetNames = () => {
    axios.get(getDataUrl)
      .then(res => {
        console.log(res.data.sheetNames);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };