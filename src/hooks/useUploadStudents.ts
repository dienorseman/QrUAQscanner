import { useEffect } from 'react';

import { addStudentId } from '../helpers';

import { useAppDispatch, useAppSelector } from '../store/store';
import { removependingExpediente, clearTemporalStudentIds } from '../store/qr/qrSlice';

export const useUploadStudents = () => {
  const dispatch = useAppDispatch();
  const {
    unsentPayload,
    expedientesPormandar,
    online,
    currentSpreadsheetPage,
  } = useAppSelector((state) => state.qr);
  const uploadStudents = () => {
    if (online && unsentPayload) {
      const numExpedientes = [...expedientesPormandar];
      for (const expediente of numExpedientes   ) {
        try{
          addStudentId(expediente, dispatch, currentSpreadsheetPage);
          dispatch(clearTemporalStudentIds());
          dispatch(removependingExpediente(expediente));
        }catch(error){
          console.error(error);
        }
      }
    }else if(online && !unsentPayload){
      console.error('No hay nada para enviar!');
    }else{
      console.warn('No parece estar conectado a internet');
    }
  };
  // useEffect(() => {
  //   uploadStudents();
  // }, [online, unsentPayload, expedientesPormandar]);

  return { uploadStudents, useEffect };
};
