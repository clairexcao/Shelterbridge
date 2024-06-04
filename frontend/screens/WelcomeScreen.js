import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = () => {
  const navigation = useNavigation(); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {/* <LinearGradient
      colors={['#f7ebff', '#ddc9ff']} // Start with #f7ebff at the top and #ddc9ff at the bottom
      style={styles.container}
    ></LinearGradient> */}
      <Image
        source={require('../data/chatbot.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Hi, I'm Chatbot!!</Text>
      <Text style={styles.subtitle}>
        Click here to start chatting and I'll answer any questions you have!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatbotScreen')}>
        <Text style={styles.buttonText}>Click to Chat</Text>
      </TouchableOpacity>
      <Text style={styles.exampleQuestionsTitle}>Example questions you can ask:</Text>
      <Text style={styles.exampleQuestionsText}>- Where is the nearest shelter place?</Text>
      <Text style={styles.exampleQuestionsText}>- Where is the nearest open food location?</Text>
      <Text style={styles.exampleQuestionsText}>- What's the weather in Portland today?</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7ebff'
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6A1B9A',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#BA68C8',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exampleQuestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 5,
  },
  exampleQuestionsText: {
    fontSize: 16,
    color: '#6A1B9A',
    marginBottom: 5,
  }
});

export default WelcomeScreen;
