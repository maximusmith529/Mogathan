import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

export default function App() {

  const fetchVision = async () => {

    let result = await  ImagePicker.launchImageLibraryAsync({
      mediaTypes:await ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      //aspect:[4,3],
      quality:0.5
  
  })
   
  const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
    console.log(Constants?.manifest?.extra?.apiKey);
    await fetch('https://vision.googleapis.com/v1/images:annotate?key='+Constants?.manifest?.extra?.apiKey, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64
            },
            features: [
              {
                type: "TEXT_DETECTION"
              }
            ]
          }
        ]
      })
    }).then((response) => response.json()).then((json) => {
      console.log(json.responses[0].fullTextAnnotation.text);
  });
  }
  fetchVision();
  return (
    <View style={styles.container}>
      <Text>testing123</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
