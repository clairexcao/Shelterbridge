// ResourceList.js
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ResourceListStyles';

const ResourceList = ({ route, navigation }) => {
    const { resources, title } = route.params;
    let filteredResources = resources;
    if (title == 'Available Beds') {
        // fitler out resources with capacity
        filteredResources = resources.filter(resource => resource.available != undefined);
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

                let availableStyle = styles.resourceDescription;
                if (available > 0) {
                    availableStyle = styles.resourceAvailable;
                } else if (available == 0) {
                    availableStyle = styles.resourceUnavailable;
                }

                return (<TouchableOpacity
                    key={index}
                    style={styles.resourceItem}
                    onPress={() => navigation.navigate('ResourceDetails', { resource })}
                >
                    <Text style={styles.resourceTitle}>{resource.name}</Text>
                    <Text style={styles.resourceDescription}>{info}</Text>
                    {resource.category == 'Shelter' ? (<Text style={styles.resourceDescription}>Capacity: {capacity}</Text>) : null}
                    {resource.category == 'Shelter' ? (<Text style={availableStyle}>Available: {available}</Text>) : null}
                </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

//hi

export default ResourceList;
