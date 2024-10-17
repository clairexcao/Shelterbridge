import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

const ReviewComponent = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        onSubmit({ name, rating, review });
        setName('');
        setRating();
        setReview('');
    };

    return (
        <View style={styles.container}>
            <Button
                title="Submit Review"
                onPress={handleSubmit}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text>Rating:</Text>
            <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                ratingBackgroundColor='#f5f5f5'
                startingValue={rating}
                onFinishRating={setRating}
            />
            <TextInput
                placeholder="Your review"
                value={review}
                onChangeText={setReview}
                multiline
                numberOfLines={4}
                style={styles.textArea}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
        textAlignVertical: 'top',
    }
});

export default ReviewComponent;
