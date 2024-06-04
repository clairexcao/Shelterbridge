import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Chat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://api.openai.com/v1/chat/completions',
            {
                messages: [{
                    'role': 'user',
                    'content': input
                }
                ],
                max_tokens: 150,
                model: 'gpt-3.5-turbo',
            },
            {
                headers: {
                    'Authorization': `Bearer sk-proj-yMrN9RRMIMmQPcx3bGncT3BlbkFJ9XibTmysFVMtqfvkfgvI`,
                    'Content-Type': 'application/json'
                }
            });
            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            console.error(error);
            setResponse('Error: Unable to fetch response');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type your prompt here"
                value={input}
                onChangeText={setInput}
            />
            <Button title="Send" onPress={handleSubmit} />
            <Text style={styles.response}>{response}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    response: {
        marginTop: 16,
        fontSize: 16,
        color: 'black',
    },
});

export default Chat;
