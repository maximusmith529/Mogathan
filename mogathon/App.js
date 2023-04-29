import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage.js";
import UploadImage from "./pages/UploadImage.js";
import SummaryPage from "./pages/SummaryPage.js";
import HelpPage from "./pages/HelpPage.js";

const Stack = createNativeStackNavigator();

export default function App() {
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
