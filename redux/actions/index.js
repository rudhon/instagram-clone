import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, CLEAR_DATA } from '../constants/index';

export function clearData() {
  return((dispatch) => {
    dispatch({ type: CLEAR_DATA })
  })
}

export function fetchUser() {
  return((dispatch) => {
    firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if(snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log('does not exist')
        }
      })
  
  })
}
export function fetchUserPosts() {
  return((dispatch) => {
    firebase.firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data }
      })
      dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
    })
  
  })

}
