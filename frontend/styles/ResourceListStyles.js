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
  }
});

export default styles;
