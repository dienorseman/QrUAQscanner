import React from 'react'
import { useEffect } from 'react';


import SelectDropdown from 'react-native-select-dropdown';

import { selectSpreadsheetPage } from '../store/qr/qrSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getSheetNames } from '../helpers';


export const SpreadsheetSelector = () => {

    const { spreadsheetPages } = useAppSelector(state => state.qr);

    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [spreadsheetPages])

    return (
        <SelectDropdown data={spreadsheetPages}
            // buttonStyle={{ width: '100%', height: 50, backgroundColor: '#c4c4c4', borderRadius: 8, }}
            defaultButtonText={'Selecciona un evento'}
            onSelect={(selectedItem, index) => {
                dispatch(selectSpreadsheetPage(selectedItem));
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }} />

    )
}
