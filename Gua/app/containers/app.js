import React, { Component } from 'react';
import {
} from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);

import {
    createStackNavigator,
    createBottomTabNavigator,
    SwitchNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';

import { Splash } from '../pages/splash';
import Home from '../pages/HomePages/home';
import NewPost from '../pages/NewPost';

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
        }
    },
    {
        initialRouteName: 'Home'
    }
);

const TabPage = createBottomTabNavigator(
    {
        Home: { 
            screen: HomeStack,
        },
        Hot: HomeStack,
        User: HomeStack,
    },{
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home'
                } else if (routeName === 'Hot') {
                    iconName = 'heart'
                }else if(routeName === 'User'){
                    iconName = 'baffled'
                }
                return <_Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            tabStyle: {
                backgroundColor: '#FFEECC'
            },
        },
    }
);

const MainStack = createStackNavigator(
    {
        TabPage: {   
            screen: TabPage,
            navigationOptions:{
                header: null
            }
        },
        NewPost: { 
            screen: NewPost,
        },
    },
)

const App = createAppContainer(createSwitchNavigator(
    {
        Splash: Splash,
        Main: MainStack
    },
    {
        initialRouteName: 'Splash',
    }
))

export default App;