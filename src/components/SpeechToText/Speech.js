import { Text, Button, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import styles from './SpeechStyle';
import { FontAwesome } from '@expo/vector-icons';


/* From the terminal: eas build--profile development--platform android
From the terminal: npx expo start --dev-client
Scan the QR code with your device */
export default function Speech({ spokenText }) {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("en-US");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    // Pass the spoken text back to the parent component
    setResults(result.value);
    if (spokenText) {
      spokenText(result.value[0]);
    }
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={started ? startSpeechToText : stopSpeechToText}>
        <FontAwesome
          name={started ? 'microphone': 'microphone-slash'}
          size={48}
          color={started ? 'red' : '#007bff'}
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

