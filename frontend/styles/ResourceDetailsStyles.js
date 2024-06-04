import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5', // Light grey background
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#b8a9c9',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 18,
      color: '#000', 
      textAlign: 'center',
      marginBottom: 10,
    },
    details: {
      fontSize: 16,
      color: '#b0c4de',
      marginBottom: 10,
    },
    reviewContainer: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#e6e6fa', // lavender background for reviews
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#b8a9c9', // pastel purple color
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 3,
    },
    reviewName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#6a5acd', // slate blue
    },
    reviewRating: {
      fontSize: 14,
      color: '#f1c40f', // gold for stars
      marginBottom: 5,
    },
    reviewDate: {
      fontSize: 12,
      color: '#b0c4de', // light steel blue
      marginBottom: 5,
    },
    reviewText: {
      fontSize: 14,
      color: '#483d8b', // dark blue/purple (change?)
    },
    infoBox: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 15,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: '#b8a9c9',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 3
    },
    label: {
      color: '#6a5acd',
      fontWeight: 'bold',
      marginBottom: 5
    },
    content: {
      color: '#000',
      fontSize: 16
    },
    contentLink: {
      color: '#6a5acd',
      fontSize: 16,
      textDecorationLine: 'underline'
    }
  });
  

export default styles;
