import React, { Component } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchUser } from '../redux/actions/index';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createBottomTabNavigator()

const EmptyScreen = () => {
  return null
}

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser(); 
  }
  render() {
    // const {currentUser} = this.props;
    // console.log(currentUser);
    // if (currentUser == undefined) {
    //   return (
    //     <View></View>
    //   )
    // }
    return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Feed" 
          component={FeedScreen} 
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          listeners={({navigation}) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('Add');
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            )
          }}
        />

      </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);