import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
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

export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
        }
        
        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
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
                    title="Sign In"
                    onPress={this.onSignUp}
                />
            </View>
        )
    }
}
