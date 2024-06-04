import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = ({ navigation }) => {
  const [resources, setResources] = useState([]);

  const categories = ['Food', 'Shelter', 'Legal Assistance', 'Addiction Recovery', 'Women and Children'];

  const fetchResources = async () => {
    try {
      const requests = categories.map(category => 
        axios.get(`https://eufv359foj.execute-api.us-west-2.amazonaws.com/stage/categories/v1/${category}`)
      );
      const responses = await Promise.all(requests);
      const allResources = responses.flatMap(response => response.data); 
      setResources(allResources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setResources([]);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const getResourcePinColor = (category) => {
    switch (category) {
      case 'Food': return 'red';
      case 'Shelter': return '#2979FF';
      case 'Legal Assistance': return '#C6FF00';
      case 'Addiction Recovery': return 'pink'; 
      case 'Women and Children': return 'purple'; 
      default: return 'gray';
    }
  };

  const handleMarkerPress = (resource) => {
    navigation.navigate('ResourceDetails', { resource });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.5231,
          longitude: -122.6765,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {resources.map(resource => (
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window'). width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
