import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'; 
import { applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase/compat/app';
import "firebase/storage";
import rootReducer from './redux/reducers';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import AIChat from './components/main/AIChat';

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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
      isConnected: true,
    };
  }

  componentDidMount() {
    this.checkConnection();
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  checkConnection = () => {
    NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
      if (!state.isConnected) {
        Alert.alert('Bağlantı Hatası', 'Uygulama internet bağlantısı gerektirir.');
      }
    });
  };

  render() {
    const { loggedIn, loaded, isConnected } = this.state;

    if (!loaded) {
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!isConnected) {
      return (
        <View style={styles.container}>
          <Text style={styles.offlineText}>İnternet bağlantısı yok. Lütfen bağlantınızı kontrol edin.</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
            <Stack.Screen name="AIChat" component={AIChat} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  offlineText: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;
