// HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b8a9c9', // pastel purple color
        padding: 20,
        margin: 10,
        borderRadius: 30,
        width: 250
    },
    buttonText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 16
    },
    currentCityButtonText: {
        marginLeft: 10,
        color: '#000',
        fontSize: 18
    }
});

export default styles;
