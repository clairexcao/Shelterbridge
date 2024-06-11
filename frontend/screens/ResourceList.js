// ResourceList.js
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ResourceListStyles'; 

const ResourceList = ({ route, navigation }) => {
  const { resources, title } = route.params;
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text>  */}
      {resources.map((resource, index) => {
        let info = resource.phoneNumber;
        if(resource.category == "Hotline") {
          info = resource.phoneNumber;
        }
        else {
          info = resource.description;
        }
        

        return ( <TouchableOpacity
          key={index}
          style={styles.resourceItem}
          onPress={() => navigation.navigate('ResourceDetails', { resource })}
        >
          <Text style={styles.resourceTitle}>{resource.name}</Text> 
          <Text style={styles.resourceDescription}>{info}</Text> 
        </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

//hi

export default ResourceList;
