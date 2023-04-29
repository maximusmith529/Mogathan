import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from "@react-navigation/native";
import Constants from 'expo-constants';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage.js";
import UploadImage from "./pages/UploadImage.js";
import SummaryPage from "./pages/SummaryPage.js";
import HelpPage from "./pages/HelpPage.js";

const Stack = createNativeStackNavigator();

export default function App() {

  const [summText, setSummText] = useState("");

  const fetchVision = async () => {

    let result = await  ImagePicker.launchImageLibraryAsync({
      mediaTypes:await ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      //aspect:[4,3],
      //quality:0.5
  
  })
   
  const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
    console.log(Constants?.manifest?.extra?.apiKey);
    const response  = await fetch('https://vision.googleapis.com/v1/images:annotate?key='+Constants?.manifest?.extra?.visionKey, {
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
    });
    const data = await response.json();
    console.log(data.responses[0].fullTextAnnotation.text)
    return data.responses[0].fullTextAnnotation.text;

  }
  const useGPT = async(prompt) => {
    const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    const API_KEY = Constants?.manifest?.extra?.openAiKey

    console.log(API_KEY);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model:"gpt-4",
        max_tokens: 128,
        messages: [{role: "system", content: "You are an assistant to the law firm Morgan & Morgan. Your job is to help describe the user's text prompt in layman's terms. Their prompt will usually include legal documents or terms. If it is a legal document try to summarize as concisely and as short as possible."},
                {role: "user", content: prompt}],
        temperature: 1,
        n: 1,
        stop: '\n'
      })
    });
  
    const data = await response.json();
    console.log(data.choices[0].message.content)
    //setSummText(data.choices[0].text);
  }

  useEffect(() => {
    async function fetchData() {
      let imgText = await fetchVision();
      console.log("image text is:"+imgText);
      await useGPT(imgText);
    }
    fetchData();
  },[]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="UploadImage"
                    component={UploadImage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="SummaryPage"
                    component={SummaryPage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="HelpPage"
                    component={HelpPage}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
