import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
// import { firebaseConfig } from './firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJPw7enMgK3vKefXLMNhHudttz-PZFfGY",
  authDomain: "instagram-native-832ff.firebaseapp.com",
  projectId: "instagram-native-832ff",
  storageBucket: "instagram-native-832ff.appspot.com",
  messagingSenderId: "893600502254",
  appId: "1:893600502254:web:5605d59a9a6b8ed4dbfeff",
  measurementId: "G-4Q5H9PVQRK"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  
  render () {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )
    }
    
    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen 
              name="Landing" 
              component={LandingScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>User is logged in</Text>
      </View>
    )
  }
}