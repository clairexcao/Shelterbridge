import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MapScreen = ({ navigation }) => {
  const [resources, setResources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleSelectedCategoriesChange = (id) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  const filteredResources = selectedCategories.length > 0 
    ? resources.filter(resource => selectedCategories.includes(resource.category)) 
    : resources;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
                selectedCategories.includes(category.id) && styles.selectedCategoryItem
              ]}
              onPress={() => handleSelectedCategoriesChange(category.id)}>
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
        initialRegion={{
          latitude: 45.5231,
          longitude: -122.6765,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
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
