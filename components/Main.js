import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, clearData } from '../redux/actions/index';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import AiScreen from './main/AIChat';
import SearchScreen from './main/Search';


const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return (null);
}


class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
  }
  
  render() {
    return (
      
      <Tab.Navigator initialRouteName='Feed' labeled = {false}>
        <Tab.Screen name="Feed" component={FeedScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Search" component={SearchScreen} navigation ={this.props.navigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="AddContainer" component={EmptyScreen} 
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("Add")
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} 
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
        }})}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            
          ),
        }}
        />
        <Tab.Screen name="AIChat" component={AiScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-question" color={color} size={26} />
            
          ),
        }}
         />

      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userState.currentUser
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
