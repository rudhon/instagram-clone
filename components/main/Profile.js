import React from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

import {connect} from 'react-redux'


function Profile(props) {
  const  {currentUser, posts}  = props;
  console.log({ currentUser, posts });
  
  return (
    <View style = {styles.container}>
      <View style= {styles.containerInfo}>
          <Text>{currentUser?.name}</Text>
          <Text>{currentUser?.email}</Text>
          <Button title="Logout" onPress={() => firebase.auth().signOut()} />
      </View>
      <View style = {styles.containerGallery}>
        <FlatList 
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
            </View>
          )}
        />
      </View>
    </View>
    
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  image: {
    flex: 1,
    aspectRatio: 1/1
  },
  containerImage: {
    flex: 1/3
  }

})
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts
});

export default connect(mapStateToProps,null)(Profile);
