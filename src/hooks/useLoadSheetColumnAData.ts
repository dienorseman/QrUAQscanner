import { useEffect } from 'react';
import { getColumnAData } from '../helpers/getColumnAData';
import { setColumnAData } from '../store/qr/qrSlice';
import { useAppDispatch } from '../store/store';

export const useLoadColumnAData = (sheetName: string) => {
    const dispatch = useAppDispatch();
    const vacio = [""];

    const fetchColumnAData = async () => {
        if (sheetName != "Offline"){
            await getColumnAData(dispatch, sheetName);
        } else{
            await dispatch(setColumnAData(vacio));
        }
    };
    useEffect(() => {
        fetchColumnAData();
    }, []);

    return {
        fetchColumnAData,
    }
};