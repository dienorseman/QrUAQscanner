import axios from "axios";

const sheets_id = "17GgGhd3K5inEx3JPk50Yboi3tv8AR6IOKCILlEoSbKo";
const addUrl = "https://script.google.com/macros/s/AKfycbxn6CT_xQ4mnDub7ld1BX_1UT2xcbhmAy_tu-qvT5cbhuYj5w2rcwjxGU6ubMOcOeEc/exec";
const getDataUrl = "https://script.google.com/macros/s/AKfycbxn6CT_xQ4mnDub7ld1BX_1UT2xcbhmAy_tu-qvT5cbhuYj5w2rcwjxGU6ubMOcOeEc/exec?spreadsheetId=" + sheets_id + "&sheets=names";


export const addStudentId = (text: string) => {
  const requestData = {
    spreadsheetId: sheets_id,
    sheet: "Exp",
    rows: [
      [
        text
      ]
    ]
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  axios.post(addUrl, requestData, { headers })
    .then(res => {
      console.log(res.data);
    })
    .catch(e => {
      console.error("Error:", e);
    });
};


/*
export const addStudentId = () => {
    console.log('add student');

    axios.post('https://sheet.best/api/sheets/0fde9ba9-994f-4594-8f16-2f58b5234a40', {
        'expediente': '2926443'
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log(res))
    .catch(e => console.log(e))



}*/

export const addStudentId = ( text: string ) => {


    axios.post(
        'https://sheet.best/api/sheets/0fde9ba9-994f-4594-8f16-2f58b5234a40', 
        {
            'expediente': text
        }, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(res => console.log(res.data))
    .catch(e => console.log(e));
}
