import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Image, LogBox } from "react-native";
import LoginAndroidScreen from './src/screens/LoginAndroidScreen'; 
import LoginIosScreen from './src/screens/LoginIosScreen'; 
import RegisterAndroidScreen from './src/screens/RegisterAndroidScreen';
import RegisterIosScreen from './src/screens/RegisterIosScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import QuestionDetailsScreen from './src/screens/QuestionDetailsScreen';
import AddQuizScreen from './src/screens/AddQuizScreen';

const Stack = createStackNavigator();

function MyStack() {
  console.disableYellowBox = true;

  return (
    <Stack.Navigator

      screenOptions={{
        headerBackTitle: null,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#5f27cd',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={Platform.OS === 'ios' ? LoginIosScreen : LoginAndroidScreen}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Platform.OS === 'ios' ? RegisterIosScreen : RegisterAndroidScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: (
            <Image
              source={require("./assets/logo_2.png")}
            />
          ),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{ title: 'Meu Questionário' }}
      />
      <Stack.Screen
        name="QuestionDetailsScreen"
        component={QuestionDetailsScreen}
        options={{ title: 'Questão', }}
      />
      <Stack.Screen
        name="AddQuizScreen"
        component={AddQuizScreen}
        options={{
          title: 'Criar Questionário',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
