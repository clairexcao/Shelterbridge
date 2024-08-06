import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/HomeScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cities = [
    { name: 'Portland, OR', icon: 'emoticon-devil' },
    { name: 'Philadelphia, PA', icon: 'duck' },
    { name: 'Seattle, WA', icon: 'eiffel-tower' },
    { name: 'Los Angeles, CA', icon: 'ev-plug-tesla' }
];

_storeData = async (key, cityname) => {
    try {
        await AsyncStorage.setItem(
            key,
            cityname,
        );
    } catch (error) {
        // Error saving data
        console.log(error)
    }
};

const CityScreen = () => {

    const [selectedButton, setSelectedButton] = useState(null);

    const handlePress = async (index, city) => {
        setSelectedButton(index);
        console.log(city);
        _storeData('cityname', city.name);
    };

    return (
        <View style={styles.container}>
            {cities.map((city, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.button,
                        selectedButton === index && styles.buttonSelect
                    ]}
                    onPress={() => handlePress(index, city)}
                >
                    <Icon name={city.icon} size={30} color="#fff" />
                    <Text style={styles.buttonText}>{city.name}</Text>
                </TouchableOpacity>
            ))
            }
        </View >
    );
};


export default CityScreen;
