import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/HomeScreenStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([
        { name: 'Available Beds', icon: 'bed', api: 'Shelter' },
        { name: 'Food', icon: 'food', api: 'Food' },
        { name: 'Shelter', icon: 'home-group', api: 'Shelter' },
        { name: 'Legal Assistance', icon: 'gavel', api: 'LegalAssistance' },
        { name: 'Hotlines', icon: 'phone', api: 'Hotline' },
        { name: 'Mental Health', icon: 'emoticon-neutral-outline', api: 'MentalHealth' },
        { name: 'Women and Children', icon: 'human-female-girl', api: 'WomenAndChildren' }
    ]);

    const fetchResources = async (category) => {
        let cityname = config.city;
        if (!cityname) {
            cityname = 'Portland, OR';
        }
        try {
            const response = await axios.get(`${config.backendUrl}/categories/v2/${category.api}?cityname=${cityname}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch resources:', error);
            return []; // return an empty array in case of error
        }
    };

    const handlePress = async (category) => {
        const resources = await fetchResources(category);
        navigation.navigate('ResourceList', { resources, title: category.name });
    };

    return (
        <View style={styles.container}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handlePress(category)}
                >
                    <Icon name={category.icon} size={30} color="#fff" />
                    <Text style={styles.buttonText}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default HomeScreen;
