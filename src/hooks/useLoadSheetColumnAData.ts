import { useEffect } from 'react';
import { getColumnAData } from '../helpers/getColumnAData';
import { useAppDispatch } from '../store/store';

export const useLoadColumnAData = (sheetName: string) => {
    const dispatch = useAppDispatch();

    const fetchColumnAData = async () => {
        await getColumnAData(dispatch, sheetName);
    };
    useEffect(() => {
        fetchColumnAData();
    }, []);

    return {
        fetchColumnAData,
    }
};