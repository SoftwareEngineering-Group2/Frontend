import React, { useState } from 'react';
import { View, Button, Text,TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SpeechToText = ({ spokenText }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognition = new webkitSpeechRecognition();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    setRecognizedText(transcript);
    if(spokenText){
      spokenText(recognizedText)
    }
    
  };

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={isListening ? stopListening : startListening}>
        <FontAwesome
          name={isListening ? 'microphone': 'microphone-slash'}
          size={48}
          color={isListening ? 'red' : '#007bff'}
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SpeechToText;