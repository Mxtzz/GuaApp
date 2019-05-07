import React, { Component } from 'react';
import {
    Text
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

import Login from '../pages/AuthPage/Login';
import Signup from '../pages/AuthPage/SignUp';

import Splash from '../pages/splash';
import Home from '../pages/HomePages/home';
import NewPost from '../pages/NewPost';
import Content from '../pages/HomePages/Content';

import Notifications from '../pages/HotPages/Notifications';
import MyNotifi from '../pages/HotPages/MyNotifi';

import User from '../pages/UserPages/User';
import Setting from '../pages/UserPages/Setting';

import Material from '../pages/Material/Material';
import ReturnMt from '../pages/Material/ReturnMt';

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

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        }
    },
    {
        initialRouteName: 'Login'
    }
)

const NotificationsStack = createStackNavigator(
    {
        Notifications: {
            screen: Notifications,
        },
        MyNotifi: {
            screen: MyNotifi
        }
    },
    {
        initialRouteName: 'Notifications'
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
        Notifications: {
            screen: NotificationsStack
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
                } else if (routeName === 'Notifications') {
                    iconName = focused ? 'bell':'bell';
                }else if(routeName === 'User'){
                    iconName = focused ? 'baffled':'baffled';
                }
                return <_Icon name={iconName} size={25} color={tintColor} />;
            },
            tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let tabName;
                if (routeName === 'Home') {
                    tabName = '首页';
                } else if (routeName === 'Notifications') {
                    tabName = '通知';
                }else if(routeName === 'User'){
                    tabName = '我';
                }
                return <Text style={{ color: tintColor, fontSize: 12, textAlign: 'center' }}>{tabName}</Text>;
            },
        }),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: 'tomato',
            inactiveTintColor: '#666666',
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
        Content: {
            screen: Content
        },
        Setting: {
            screen: Setting
        },
        Material: {
            screen: Material,
        },
        ReturnMt: {
            screen: ReturnMt
        }
    },
)

const App = createAppContainer(createSwitchNavigator(
    {
        Splash: Splash,
        Main: MainStack,
        Login: LoginStack
    },
    {
        initialRouteName: 'Splash'
    }
))

export default App;