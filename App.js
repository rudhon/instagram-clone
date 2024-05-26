import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import {thunk} from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));


const firebaseConfig = {
  apiKey: "AIzaSyASeI6SIWU4uBdQ8SYDdpoqR9yqwiuiFJM",
  authDomain: "instagram-clone-784f4.firebaseapp.com",
  projectId: "instagram-clone-784f4",
  storageBucket: "instagram-clone-784f4.appspot.com",
  messagingSenderId: "346209054574",
  appId: "1:346209054574:web:3914a91e49f96256e35b7f",
  measurementId: "G-WL7Y47YWHS"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore;
const auth = app.auth;
const storage = firebase.storage;

export { auth, db, storage };


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import AIChat from './components/main/AIChat';


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
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
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store={ store }>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
            <Stack.Screen name="AIChat" component={AIChat} navigaton={this.props.navigaton} />
          </Stack.Navigator> 
        </NavigationContainer>
      </Provider>

        
    )
  }
}

export default App





