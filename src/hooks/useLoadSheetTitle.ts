import { useEffect } from 'react';
import { getSheetTitle } from '../helpers/getSheetTitle'; // Asegúrate de importar getSheetTitle
import { useAppDispatch } from '../store/store';

export const useLoadSheetTitle = () => {
    const dispatch = useAppDispatch();

    const fetchSheetTitle = async () => {
        await getSheetTitle(dispatch);
    };
    useEffect(() => {
        fetchSheetTitle();
    }, []);

    return {
        fetchSheetTitle,
    }
};
