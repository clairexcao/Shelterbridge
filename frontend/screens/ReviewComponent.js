import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

const ReviewComponent = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleSubmit = () => {
    // pass the review data back to a parent component HERE MEOW
    const reviewData = { name, rating, review, date };
    onSubmit(reviewData);

    // we reset fields after submission
    setName('');
    setRating(3);
    setReview('');
    setDate(new Date().toLocaleDateString());
  };

  return (
    <View style={styles.container}>
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
        startingValue={rating}
        onFinishRating={setRating}
      />
      <Text>Date: {date}</Text>
      <TextInput
        placeholder="Your review"
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />
      <Button
        title="Submit Review"
        onPress={handleSubmit}
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
