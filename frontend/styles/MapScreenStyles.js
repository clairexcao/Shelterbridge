import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterButton: {
        backgroundColor: '#b8a9c9', // pastel purple
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
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    selectedCategoryItem: {
        backgroundColor: '#E0E0E0',
    },
    categoryText: {
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
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 60,
    },
});

export default styles;