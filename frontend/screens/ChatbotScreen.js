import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showChat, setShowChat] = useState(true);
  const scrollViewRef = useRef();

  const sendMessage = () => {
    const newMessage = { id: messages.length, text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);
    mockDialogflowResponse(inputText);
    setInputText('');
  };

  const mockDialogflowResponse = (inputText) => {
    const botResponse = { id: messages.length + 1, text: `Echo: ${inputText}`, sender: 'bot' };
    setMessages(messages => [...messages, botResponse]);
  };

  return (
    <View style={styles.container}>
      {showChat ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 135 : 60}
          style={styles.chatContainer}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messageContainer}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages.map(msg => (
              <View key={msg.id} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                {msg.sender === 'bot' && (
                  <Image
                    source={require('../data/chatbotTransparent.png')} 
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
    borderRadius: 25,
    marginVertical: 4,
    padding: 12,
  },
  botMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#EDE7F6',
    borderRadius: 29,
    marginVertical: 4,
    padding: 8,
    alignItems: 'center',
  },
  messageText: {
    color: '#333',
  },
  chatIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
    resizeMode: 'contain'
  },
  floatingButton: {
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  }
});

export default ChatScreen;
