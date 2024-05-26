import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyASeI6SIWU4uBdQ8SYDdpoqR9yqwiuiFJM",
    authDomain: "instagram-clone-784f4.firebaseapp.com",
    projectId: "instagram-clone-784f4",
    storageBucket: "instagram-clone-784f4.appspot.com",
    messagingSenderId: "346209054574",
    appId: "1:346209054574:web:3914a91e49f96256e35b7f",
    measurementId: "G-WL7Y47YWHS"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    }

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          title="Sign Up"
          onPress={this.onSignUp}
        />
      </View>
    );
  }
}

export default Register;
