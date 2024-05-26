import React, { useState } from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyASeI6SIWU4uBdQ8SYDdpoqR9yqwiuiFJM",
    authDomain: "instagram-clone-784f4.firebaseapp.com",
    projectId: "instagram-clone-784f4",
    storageBucket: "instagram-clone-784f4.appspot.com",
    messagingSenderId: "346209054574",
    appId: "1:346209054574:web:3914a91e49f96256e35b7f",
    measurementId: "G-WL7Y47YWHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);


export default function Save(props, {navigation}) {
    const [caption, setCaption] = useState("");

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot);
                savePostData(snapshot);
                
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);

    }
    const savePostData = (downloadURL) => {
        firebase.firestore().collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function() {
            props.navigation.popToTop();
        }))

    }
    return (
        <View style = {{flex : 1}}>
            <Image source = {{uri : props.route.params.image}} />
            <TextInput placeholder = "Write a caption . . ." 
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title = "Save" onPress={() => uploadImage()} />
        </View>
  )
}
