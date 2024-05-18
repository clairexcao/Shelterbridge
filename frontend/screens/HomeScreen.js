import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/HomeScreenStyles'; 
import { categories } from '../data/categoriesData'; 

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate('ResourceList', { resources: category.data, title: category.name })}
          >
            <Icon name={category.icon} size={30} color="#fff" />
            <Text style={styles.buttonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


export default HomeScreen;
