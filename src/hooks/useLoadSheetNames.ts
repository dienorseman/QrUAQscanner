import { useEffect } from 'react';
import { getSheetNames } from '../helpers';
import { useAppDispatch } from '../store/store';

export const useLoadSheetNames = () => {
    const dispatch = useAppDispatch();

    const fetchSheetNames = async () => {
        await getSheetNames(dispatch);
    };
    useEffect(() => {
        fetchSheetNames();
    }, []);

    return {
        fetchSheetNames,
    }
};
