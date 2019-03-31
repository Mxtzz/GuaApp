import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../actions/auth';

import { SafeAreaView } from 'react-navigation';

import * as settings from '../constants/AppSettings';
import DataProvider from '../utils/DataProvider';
import NavigationUtil from '../utils/NavigationUtil';
import SessionUtil from '../utils/SessionUtil';
import Logger from '../utils/Logger';

const { width, height } = Dimensions.get('window');

class Splash extends Component {
    constructor(props){
        super(props);
        // this.spinValue = new Animated.Value(0);
    }

    

    componentDidMount(){
        // setTimeout(() => {
        //     this.props.navigation.navigate('Main'); 
        // }, 1000);
        // Logger.logError('********** Splash componentDidMount');
        this.checkVersionAndRedirect();
    }

    checkVersionAndRedirect = () => {
        DataProvider.checkVersionUpgrade().then(() => {
            SessionUtil.get().then((res) => {
                if (res && res.isLoggedIn && res.authenticationId && res.sessionExpireTime && new Date(res.sessionExpireTime) >= new Date()) {
                    this.props.authActions.getInitData(res.authenticationId);
                    if (res.isHomeTipsDisplay == false) {
                        this.props.navigation.navigate('Home');
                    } else {
                        // NavigationUtil.navigateStack(this.props.navigation, 'Tutorial', 'Tutorial', 0, null);
                    }
                } else {
                    this.props.navigation.navigate('Login');
                }
            });
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <SplashMain></SplashMain>
            </View>
        );
    }
}

class SplashMain extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            (
            <View style={styles.container}>
                <Image source={require('../img/splash.png')} style={styles.backgroundImg}></Image>
                <View style={styles.title}>
                    <View style={{position:'relative'}}>
                        <Text style={styles.welcome}>{'瓜社团'}</Text>
                        <Text style={styles.version}>v0.0.1</Text>  
                    </View>
                </View> 
            </View>
            )
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFEECC',
    },
    backgroundImg:{
        height: height,
        width: width
    },
    title: {
        position:'absolute',
        paddingBottom: 80,
    },
    welcome: {
        fontStyle: 'italic',
        fontSize: 30,
        color:'#333',
        textAlign: 'center',
    },
    version: {
        textAlign: 'center',
        color: '#333333'
    },
});

const mapStateToProps = (state) => {
    const { auth, accountInformation } = state;

    return {
        isLoggedIn: auth.isLoggedIn,
        // customerInfo: accountInformation.customerInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        authActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);