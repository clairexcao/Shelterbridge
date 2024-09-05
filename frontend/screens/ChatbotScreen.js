import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import config from '../config';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [showChat, setShowChat] = useState(true);
    const scrollViewRef = useRef();

    const handleSubmit = async () => {
        console.log(inputText);
        try {
            // claire's amazing RAG application
            // const res = await axios.post('http://34.82.51.95:6000/chat',
            //     {
            //         question: inputText
            //      });
            // console.log(res.data.output);
            // sendBotMessage(res.data.output);
            const res = await axios.post(`${config.api}/chat/v1`,
                {
                    input: inputText
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            console.log(res.data);
            sendBotMessage(res.data.message);
        } catch (error) {
            console.error(error);
            sendBotMessage('Error: Unable to fetch response');
        }
    };

    const sendMessage = () => {
        const newMessage = { id: messages.length, text: inputText, sender: 'user' };
        setMessages([...messages, newMessage]);
        handleSubmit(inputText);
        setInputText('');
    };

    const sendBotMessage = (input) => {
        const botResponse = { id: messages.length, text: input, sender: 'bot' };
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
                            <Icon name="send-circle" size={48} color="#b8a9c9" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <TouchableOpacity onPress={() => setShowChat(true)} style={styles.floatingButton}>
                    <Icon name="chat" size={48} color="#b8a9c9" />
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
        borderColor: '#b8a9c9',
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
        backgroundColor: '#b8a9c9',
        borderRadius: 25,
        marginVertical: 4,
        padding: 12,
    },
    botMessage: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#CBE5F8',
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
