import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import ReviewComponent from './ReviewComponent';
import styles from '../styles/ResourceDetailsStyles';

const ResourceDetails = ({ route }) => {
  const { resource } = route.params;
  const [reviews, setReviews] = useState([]);

  // fetch review function
  const fetchReviews = async () => {
    const apiUrl = `https://eufv359foj.execute-api.us-west-2.amazonaws.com/stage/reviews/v1/${resource.id}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("Received response:", response);
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [resource.id]);

  const handleReviewSubmit = async (reviewData) => {
    const postUrl = `https://eufv359foj.execute-api.us-west-2.amazonaws.com/stage/reviews/v1/${resource.id}`;
    try {
      // post new review to the backend
      await axios.post(postUrl, reviewData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // fetch updated reviews after submitting the new review
      fetchReviews();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{resource.name}</Text>
      <Text style={styles.description}>{resource.description}</Text>
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

      <ReviewComponent id={resource.id} onSubmit={handleReviewSubmit} />
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
