import { View, Text, StyleSheet } from 'react-native';
import { store, useAppDispatch, useAppSelector } from '../store/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import qrSlice, { QrState } from '../store/qr/qrSlice';
import { useLoadSheetTitle } from '../hooks/useLoadSheetTitle'; // Importa el hook personalizado

export const Tittle = () => {
    const date = new Date();

    const month = date.toLocaleDateString('es-ES', { 
        month: 'long',
     });

    const day = date.toLocaleDateString('es-ES', {
        day: 'numeric',
    });

    let weekDay = date.toLocaleDateString('es-ES', {
        weekday: 'long',
    });

    weekDay = weekDay.split(',')[0];

    weekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);

    const {sheetsTitle, loading} = useAppSelector(state => state.qr) // Obtiene el título de la hoja de cálculo del estado de Redux

    useLoadSheetTitle(); // Utiliza el hook para obtener el título de la hoja de cálculo

    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [sheetsTitle]);

    return (
        <View style={styles.container}>
            {
                (loading) ?
                    <Text>Loading</Text>:
                    <><Text style={styles.header}>{sheetsTitle}</Text><Text style={styles.date}>{weekDay} {day}, {month.charAt(0).toUpperCase() + month.slice(1)}</Text></>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '15%',
    marginLeft: '5%',
    border: 1,
    //borderWidth: 5,
    borderColor: 'red',
    position: 'relative',
  },
  header: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
    color: '#8A3CB0',
  },
  date:{
    fontSize: 18,
    color: '#838383'
  }
});

