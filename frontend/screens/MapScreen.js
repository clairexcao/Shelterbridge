import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../config.js';

const MapScreen = ({ navigation }) => {
    const [resources, setResources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: 45.5231,
        longitude: -122.6765,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const categories = [
        { id: 'Food', name: 'Food', icon: 'food', api: 'Food' },
        { id: 'Shelter', name: 'Shelter', icon: 'home-group', api: 'Shelter' },
        { id: 'Legal Assistance', name: 'Legal Assistance', icon: 'gavel', api: 'LegalAssistance' },
        { id: 'Mental Health', name: 'Mental Health', icon: 'emoticon-neutral-outline', api: 'MentalHealth' },
        { id: 'Women and Children', name: 'Women and Children', icon: 'human-female-girl', api: 'WomenAndChildren' }
    ];

    const fetchResources = async () => {
        try {
            const requests = categories.map(category =>
                axios.get(`https://eufv359foj.execute-api.us-west-2.amazonaws.com/stage/categories/v1/${category.api}`)
            );
            const responses = await Promise.all(requests);
            const allResources = responses.flatMap(response => response.data);
            setResources(allResources);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
            setResources([]);
        }
    };

    setCurrentRegion = (() => {
        console.log('map config city', config.city);
        if (config.city === 'Portland, OR') {
            setRegion({
                latitude: 45.5231,
                longitude: -122.6765,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else if (config.city === 'Philadelphia, PA') {
            setRegion({
                latitude: 39.9526,
                longitude: -75.1652,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else if (config.city === 'Seattle, WA') {
            setRegion({
                latitude: 47.6061,
                longitude: -122.3328,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else if (config.city === 'Los Angeles, CA') {
            setRegion({
                latitude: 34.0549,
                longitude: -118.2426,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else {
            setRegion({
                latitude: 45.5231,
                longitude: -122.6765,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    });

    useEffect(() => {
        fetchResources();
    }, []);

    const getResourcePinColor = (category) => {
        switch (category) {
            case 'Food': return 'red';
            case 'Shelter': return '#2979FF';
            case 'LegalAssistance': return 'green';
            case 'MentalHealth': return 'pink';
            case 'WomenAndChildren': return 'purple';
            default: return 'gray';
        }
    };

    const handleMarkerPress = (resource) => {
        navigation.navigate('ResourceDetails', { resource });
    };

    const handleSelectedCategoriesChange = (api) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(api)
                ? prevSelected.filter(item => item !== api)
                : [...prevSelected, api]
        );
    };

    const filteredResources = selectedCategories.length > 0
        ? resources.filter(resource => selectedCategories.includes(resource.category))
        : resources;

    const toggleModal = () => {
        setCurrentRegion();
        setModalVisible(!isModalVisible);
    };

    const getInitialRegion = () => {
        if (config.city === 'Portland, OR') {
            return {
                latitude: 45.5231,
                longitude: -122.6765,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
        } else if (config.city === 'Philadelphia, PA') {
            return {
                latitude: 39.9526,
                longitude: -75.1652,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
        } else {
            return {
                latitude: 45.5231,
                longitude: -122.6765,
                latitudeDelta: 0.1522,
                longitudeDelta: 0.0721,
            };
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
                <Text style={styles.filterButtonText}>Filter by Category</Text>
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Categories</Text>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryItem,
                                selectedCategories.includes(category.api) && styles.selectedCategoryItem
                            ]}
                            onPress={() => handleSelectedCategoriesChange(category.api)}>
                            <Icon name={category.icon} size={30} color="#b8a9c9" />
                            <Text style={styles.categoryText}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.applyButton} onPress={toggleModal}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <MapView
                style={styles.map}
                initialRegion={region}
                region={region}
                showsUserLocation={true}>
                {filteredResources.map(resource => (
                    <Marker
                        key={resource.id}
                        coordinate={{ latitude: resource.latitude, longitude: resource.longitude }}
                        title={resource.name}
                        description={resource.description}
                        pinColor={getResourcePinColor(resource.category)}
                        onPress={() => handleMarkerPress(resource)}
                    />
                ))}
            </MapView>
        </View>
    );
};

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

export default MapScreen;