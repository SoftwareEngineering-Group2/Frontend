import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

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
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
      {/* <Text style={{ marginTop: 20 }}>Recognized Text: {recognizedText}</Text> */}
    </View>
  );
};

export default SpeechToText;