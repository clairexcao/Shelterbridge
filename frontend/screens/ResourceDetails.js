import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, StyleSheet, Linking, Platform } from 'react-native';
import axios from 'axios';
import ReviewComponent from './ReviewComponent';
import styles from '../styles/ResourceDetailsStyles';
import config from '../config';
const ResourceDetails = ({ route }) => {
    const { resource } = route.params;
    const [reviews, setReviews] = useState([]);

    // fetch review function
    const fetchReviews = async () => {
        const apiUrl = `${config.backendUrl}/reviews/v1/${resource.id}`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setReviews(response.data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [resource.id]);

    const handleReviewSubmit = async (reviewData) => {
        const postUrl = `${config.backendUrl}/reviews/v1/${resource.id}`;
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

    const addressURL = (Platform.OS === 'android') ?
        (`http://maps.apple.com/maps?daddr=${resource.address}`) :
        (`http://maps.google.com/maps?daddr=${resource.address}`);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{resource.name}</Text>
                <Text style={styles.description}>{resource.description}</Text>
                {resource.type ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Type</Text>
                    <Text style={styles.content}>{resource.type}</Text>
                </View>) : null
                }
                {resource.address ?
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.contentLink} onPress={() => openURL(addressURL)}>{resource.address}</Text>
                    </View> : null
                }
                {resource.eligibility ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Eligibility</Text>
                    <Text style={styles.content}>{resource.eligibility}</Text>
                </View>) : null
                }
                {resource.hours ? (< View style={styles.infoBox}>
                    <Text style={styles.label}>Hours</Text>
                    <Text style={styles.content}>{resource.hours}</Text>
                </View>) : null
                }
                {resource.email ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.content}>{resource.email}</Text>
                </View>) : null
                }
                {resource.phone ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.contentLink} onPress={() => openURL(`tel:${resource.phone}`)}> {resource.phone}</Text>

                </View>) : null
                }
                {resource.directions ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Directions</Text>
                    <Text style={styles.content}>{resource.directions}</Text>
                </View>) : null
                }
                {resource.directionslink ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Directions</Text>
                    <Text style={styles.contentLink} onPress={() => openURL(resource.directionslink)}>{resource.directionslink}</Text>
                </View>) : null
                }
                {resource.servicearea ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Areas Served</Text>
                    <Text style={styles.content}>{resource.servicearea}</Text>
                </View>) : null
                }
                {resource.website ? (<View style={styles.infoBox}>
                    <Text style={styles.label}>Website</Text>
                    <Text style={styles.contentLink} onPress={() => openURL(resource.website)}>{resource.website}</Text>
                </View>) : null
                }
                <ReviewComponent id={resource.id} onSubmit={handleReviewSubmit} />
                {
                    reviews.map((review, index) => (
                        <View key={index} style={styles.reviewContainer}>
                            <Text style={styles.reviewName}>{review.name}</Text>
                            <Text style={styles.reviewRating}>{review.rating} Stars</Text>
                            <Text style={styles.reviewDate}>{review.date}</Text>
                            <Text style={styles.reviewText}>{review.review}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ResourceDetails;
