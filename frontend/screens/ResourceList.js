// ResourceList.js
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ResourceListStyles'; 

const ResourceList = ({ route, navigation }) => {
  const { resources, title } = route.params;
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text>  */}
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceItem}
          onPress={() => navigation.navigate('ResourceDetails', { resource })}
        >
          <Text style={styles.resourceTitle}>{resource.name}</Text> 
          <Text style={styles.resourceDescription}>{resource.description}</Text> 
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

//hi

export default ResourceList;
