import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showChat, setShowChat] = useState(true);

  const sendMessage = () => {
    const newMessage = { id: messages.length, text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);
    mockDialogflowResponse(inputText);
    setInputText('');
  };

  const mockDialogflowResponse = (inputText) => {
    // simulating just echo response for now
    const botResponse = { id: messages.length + 1, text: `Echo: ${inputText}`, sender: 'bot' };
    setMessages(messages => [...messages, botResponse]);
  };

  return (
    <View style={styles.container}>
      {showChat ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.chatContainer}
        >
          <ScrollView style={styles.messageContainer}>
            {messages.map(msg => (
              <View key={msg.id} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                {msg.sender === 'bot' && (
                  <Image
                    source={require('../data/chatbot.png')} 
                    style={styles.chatIcon}
                  />
                )}
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
              placeholder="Type your message here..."
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send-circle" size={48} color="#B39BC8" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <TouchableOpacity onPress={() => setShowChat(true)} style={styles.floatingButton}>
          <Icon name="chat" size={48} color="#B39BC8" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    height: '100%',
    backgroundColor: '#f7f4f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 40,
    backgroundColor: 'white',
    borderColor: '#B39BC8',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    padding: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E1BEE7',
    borderRadius: 15,
    marginVertical: 4,
    padding: 8,
  },
  botMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#EDE7F6',
    borderRadius: 15,
    marginVertical: 4,
    padding: 8,
    alignItems: 'center',
  },
  messageText: {
    color: '#333',
  },
  chatIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  floatingButton: {
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  }
});

export default ChatScreen;
