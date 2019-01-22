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

import Hot from '../pages/HotPages/hot';

import User from '../pages/UserPages/user';

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

const HotStack = createStackNavigator(
    {
        Hot: {
            screen: Hot,
        }
    },
    {
        initialRouteName: 'Hot'
    }
);

const UserStack = createStackNavigator(
    {
        User: {
            screen: User,
        }
    },
    {
        initialRouteName: 'User'
    }
);

const TabPage = createBottomTabNavigator(
    {
        Home: { 
            screen: HomeStack,
        },
        Hot: {
            screen: HotStack
        },
        User: {
            screen: UserStack
        }
    },{
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = focused ? 'home':'home';
                } else if (routeName === 'Hot') {
                    iconName = focused ? 'heart':'heart';
                }else if(routeName === 'User'){
                    iconName = focused ? 'baffled':'baffled';
                }
                return <_Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: 'tomato',
            inactiveTintColor: '#000000',
            tabStyle: {
                backgroundColor: '#FFFFFF'
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