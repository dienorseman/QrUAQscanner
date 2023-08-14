import axios from "axios";


export const addStudentId = ( text: string ) => {
    console.log('add student', text);

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