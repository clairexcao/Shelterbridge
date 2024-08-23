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
    buttonSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000', // black color
        padding: 20,
        margin: 10,
        borderRadius: 30,
        width: 250
    },
    cityButtonSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 20,
        margin: 10,
        borderRadius: 30,
        width: 250
    },
    buttonText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 16
    }
});

export default styles;
