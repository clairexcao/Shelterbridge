import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/HomeScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config.js';

const cities = [
    { name: 'Portland, OR', icon: 'city' },
    { name: 'Coos Bay, OR', text: 'Coos-Curry, OR', icon: 'city' },
    { name: 'Polk-Marion-Yamhill, OR', icon: 'city' },
    { name: 'Philadelphia, PA', icon: 'city' },
    { name: 'Seattle, WA', icon: 'city' },
    { name: 'Los Angeles, CA', icon: 'city' },
    { name: 'Charlotte, NC', icon: 'city' },
];

_retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
        console.log(error)
    }
};

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

    useEffect(() => {
        const setCurrentCity = async () => {
            const cityname = await _retrieveData('cityname');
            if (cityname) {
                const selectedCity = cities.find(city => city.name === cityname);
                if (selectedCity) {
                    setSelectedButton(cities.indexOf(selectedCity));
                }
            } else {
                setSelectedButton(cities.indexOf('Portland, OR'));
            }

        };
        setCurrentCity();
    }, []);

    const handlePress = async (index, city) => {
        setSelectedButton(index);
        _storeData('cityname', city.name);
        config.city = city.name;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Please Select Your City</Text>
            {cities.map((city, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={selectedButton === index ? styles.button : styles.button}
                        onPress={() => handlePress(index, city)}
                    >
                        <Icon name={selectedButton === index ? 'home' : city.icon} size={30} color={selectedButton === index ? "black" : "#fff"} />
                        <Text style={selectedButton === index ? styles.currentCityButtonText : styles.buttonText}>{city.text ? city.text : city.name}</Text>
                    </TouchableOpacity>
                );
            })
            }
        </View >
    );
};


export default CityScreen;
