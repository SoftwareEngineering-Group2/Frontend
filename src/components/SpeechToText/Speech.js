import { Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import styles from './SpeechStyle';


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
    <View style={styles.container}>
      {!started ? <Button title='Start listening' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Stop listening' onPress={stopSpeechToText} /> : undefined}
    </View>
  );
}
