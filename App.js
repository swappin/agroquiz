// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from "react-native";


import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import QuestionDetailsScreen from './src/screens/QuestionDetailsScreen';
import AddQuizScreen from './src/screens/AddQuizScreen';
import AddQuestionsScreen from './src/screens/AddQuestionsScreen';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5f27cd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: null,

          headerStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            }
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: (
            <Image
              style={{width: 100}}
              source={require("./assets/logo.png")}
            />
          ),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{ title: ' Meu Questionário' }}
      />
      <Stack.Screen
        name="QuestionDetailsScreen"
        component={QuestionDetailsScreen}
        options={{ title: 'Questão' }}
      />
      <Stack.Screen
        name="AddQuizScreen"
        component={AddQuizScreen}
        options={{ title: 'Criar Questionário' }}
      />
      <Stack.Screen
        name="AddQuestionsScreen"
        component={AddQuestionsScreen}
        options={{
          title: 'Questionário dddd',
          headerLeft: null,
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