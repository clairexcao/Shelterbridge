import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/ResourceListStyles';
import Modal from 'react-native-modal';
import haversine from 'haversine';
import config from '../config';

const ResourceList = ({ route, navigation }) => {
    const [filter, setFiter] = useState('');
    const [selectedTerms, setSelectedTerms] = useState(['Short Term', 'Long Term']);
    const [isModalVisible, setModalVisible] = useState(false);

    const { resources, title } = route.params;
    let filteredResources = resources;
    let isShelter = (title == 'Available Beds') || (title == 'Shelter');
    // filter out resources with capacity
    if (title == 'Available Beds') {
        filteredResources = resources.filter(resource => resource.available != undefined);
    }

    // calculate distance and sort by it for Available Beds
    if (config.location && isShelter) {
        // caclulate distance
        filteredResources.forEach(resource => {
            if (resource.latitude == undefined || resource.longitude == undefined ||
                resource.latitude == 0 || resource.longitude == 0 ||
                !config.location) {
                resource.distance = undefined;
                return;
            }
            const start = {
                latitude: config.location.coords.latitude,
                longitude: config.location.coords.longitude
            };
            const end = {
                latitude: resource.latitude,
                longitude: resource.longitude
            };
            resource.distance = haversine(start, end, { unit: 'mile' });
        });
        // sort
        if (title == 'Available Beds') {
            filteredResources.sort((a, b) => {
                if (!a.distance || !b.distance) {
                    return undefined;
                }
                return (a.distance - b.distance);
            });
        }
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelectedItemChange = (itemStr) => {
        setSelectedTerms(prevSelected =>
            prevSelected.includes(itemStr)
                ? prevSelected.filter(item => item !== itemStr)
                : [...prevSelected, itemStr]
        );
    };

    return (

        <ScrollView style={styles.container}>

            <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
                <Text style={styles.filterButtonText}>{isShelter ? 'Filter by Name or Term' : 'Filter by Name'}</Text>
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{isShelter ? 'Select Filter by Name or Term' : 'Select Filter by Name'}</Text>
                    <TextInput
                        placeholder="Filter by Name"
                        value={filter}
                        onChangeText={setFiter}
                        clearButtonMode='always'
                        style={styles.filterInput}
                    />
                    {isShelter ? (
                        <TouchableOpacity
                            key={'Short Term'}
                            style={[
                                styles.modalItem,
                                selectedTerms.includes('Short Term') && styles.selectedModalItem
                            ]}
                            onPress={() => handleSelectedItemChange('Short Term')}>
                            <Text style={styles.modalItemText}>Short Term</Text>
                        </TouchableOpacity>
                    ) : null}
                    {isShelter ? (
                        <TouchableOpacity
                            key={'Long Term'}
                            style={[
                                styles.modalItem,
                                selectedTerms.includes('Long Term') && styles.selectedModalItem
                            ]}
                            onPress={() => handleSelectedItemChange('Long Term')}>
                            <Text style={styles.modalItemText}>Long Term</Text>
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity style={styles.applyButton} onPress={toggleModal}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {filteredResources.map((resource, index) => {
                let visible = resource.name.toLowerCase().includes(filter.toLowerCase());

                let termVisible = true;
                if (!selectedTerms.includes('Short Term') && resource.term == 'Short Term') {
                    termVisible = false;
                }
                if (!selectedTerms.includes('Long Term') && (resource.term == 'Long Term' || resource.term == undefined)) {
                    termVisible = false;
                }

                let info = resource.description;
                if (resource.category == 'Hotline') {
                    info = resource.phone;
                } else if (title == 'Available Beds') {
                    info = resource.phone;
                }
                let capacity = resource.capacity;

                if (capacity == undefined) {
                    capacity = "N/A"
                }

                let available = resource.available;
                if (available == undefined) {
                    available = "N/A"
                }

                let waiting = resource.waiting;
                if (waiting == undefined) {
                    waiting = "N/A"
                }

                let availableStyle = styles.resourceDescription;
                if (available > 0) {
                    availableStyle = styles.resourceAvailable;
                } else if (available == 0) {
                    availableStyle = styles.resourceUnavailable;
                }

                let lastUpdate = resource.updateTime ? new Date(resource.updateTime).toLocaleString() : 'N/A';
                let distance = resource.distance ? resource.distance.toFixed(2) + ' miles' : 'N/A';

                return (visible && termVisible && <TouchableOpacity
                    key={index}
                    style={styles.resourceItem}
                    autoCompleteType="off"
                    onPress={() => navigation.navigate('ResourceDetails', { resource })}
                >
                    <Text style={styles.resourceTitle}>{resource.name}</Text>
                    <Text style={styles.resourceDescription}>{info}</Text>
                    {resource.category == 'Shelter' ? (<Text style={styles.resourceDescription}>Distance: {distance}</Text>) : null}
                    {resource.category == 'Shelter' ? (<Text style={styles.resourceDescription}>Capacity: {capacity}</Text>) : null}
                    {resource.category == 'Shelter' ? (<Text style={availableStyle}>Available: {available}</Text>) : null}
                    {resource.category == 'Shelter' ? (<Text style={styles.resourceDescription}>Waiting List: {waiting}</Text>) : null}
                    {resource.category == 'Shelter' ? (<Text style={styles.resourceDescription}>Last update: {lastUpdate}</Text>) : null}

                </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default ResourceList;
