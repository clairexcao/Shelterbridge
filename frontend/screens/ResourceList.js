import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ResourceListStyles';
import haversine from 'haversine';
import config from '../config';


const ResourceList = ({ route, navigation }) => {
    const { resources, title } = route.params;
    let filteredResources = resources;

    // filter out resources with capacity
    if (title == 'Available Beds') {
        filteredResources = resources.filter(resource => resource.available != undefined);
    }

    // calculate distance and sort by it for Available Beds
    if (config.location && (title == 'Available Beds' || title == 'Shelter')) {
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

    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.title}>{title}</Text>  */}
            {filteredResources.map((resource, index) => {
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

                return (<TouchableOpacity
                    key={index}
                    style={styles.resourceItem}
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
