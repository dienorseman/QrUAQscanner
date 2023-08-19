import { useEffect } from 'react';

import { addStudentId } from '../helpers';

import { useAppDispatch, useAppSelector } from '../store/store';
import { removependingExpediente } from '../store/qr/qrSlice';

export const useUploadStudents = () => {
  const dispatch = useAppDispatch();
  const {
    unsentPayload,
    expedientesPormandar,
    online,
    currentSpreadsheetPage,
  } = useAppSelector((state) => state.qr);
  useEffect(() => {
    if (online && unsentPayload) {
      for (const expediente of expedientesPormandar) {
        addStudentId(expediente, dispatch, currentSpreadsheetPage);
        dispatch(removependingExpediente(expediente));
      }
    }
  }, [online, unsentPayload, expedientesPormandar]);
};
