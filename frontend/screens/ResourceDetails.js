import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ReviewComponent from './ReviewComponent';  
import styles from '../styles/ResourceDetailsStyles';  

const ResourceDetails = ({ route }) => {
  const { resource } = route.params;
  const [reviews, setReviews] = useState([]);

  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleReviewSubmit = (reviewData) => {
    setReviews([...reviews, reviewData]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{resource.name}</Text>
      <Text style={styles.description}>{resource.description}</Text>
      {/* <Text style={styles.details}>{resource.details}</Text> */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.content}>{resource.address}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Eligibility</Text>
        <Text style={styles.content}>{resource.eligibility}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Hours</Text>
        <Text style={styles.content}>{resource.hours}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.content}>{resource.email}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.content}>{resource.phoneNumber}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Directions</Text>
        <Text style={styles.content}>{resource.directions}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Website</Text>
        <Text style={styles.contentLink} onPress={() => openURL(resource.website)}>{resource.website}</Text>
      </View>

      <ReviewComponent onSubmit={handleReviewSubmit} />
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.reviewName}>{review.name}</Text>
          <Text style={styles.reviewRating}>{review.rating} Stars</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
          <Text style={styles.reviewText}>{review.review}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ResourceDetails;
