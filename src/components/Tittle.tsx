import { View, Text, StyleSheet } from 'react-native';


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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Semana Academica y Cultural</Text>
            <Text style={styles.date}>{weekDay} {day}, {month}</Text>
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
