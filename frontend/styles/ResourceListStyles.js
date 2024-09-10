// ResourceListStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    resourceItem: {
        backgroundColor: '#b8a9c9', // Pastel purple color
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        elevation: 2, // Adds shadow on Android
        shadowColor: '#000', // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    resourceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    resourceDescription: {
        fontSize: 14,
        color: '#fff'
    },

    resourceAvailable: {
        fontSize: 16,
        color: '#90EE90'
    },
    resourceUnavailable: {
        fontSize: 16,
        color: '#ff0000'
    },
    filterInput: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 8,
        marginBottom: 8,
        paddingHorizontal: 5,
    },
    filterButton: {
        backgroundColor: '#b8a9c9', // pastel purple
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        margin: 10,
    },
    filterButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modal: {
        justifyContent: 'flex-start',
        margin: 20,
        marginVertical: 60,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    selectedModalItem: {
        backgroundColor: '#E0E0E0',
    },
    modalItemText: {
        marginLeft: 10,
        fontSize: 16,
    },
    applyButton: {
        backgroundColor: '#b8a9c9', // pastel purple
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;
