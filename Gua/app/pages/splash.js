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
import Logger from '../utils/Logger';
import SessionUtil from '../utils/SessionUtil';

const { width, height } = Dimensions.get('window');

class Splash extends Component {
    constructor(props){
        super(props);
    }

    

    componentDidMount(){
        this.checkVersionAndRedirect();
    }

    checkVersionAndRedirect = () => {
        SessionUtil.get().then((res)=>{
            if(res){
                res = JSON.parse(res);
                if(res.isLogin == true){
                    this.props.getInitData();
                    this.props.navigation.navigate('Home');
                } else {
                    this.props.navigation.navigate('Login');
                }
            }else {
                this.props.navigation.navigate('Login');
            }
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
    const { auth } = state;

    return {
        isLoggedIn: auth.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        getInitData: authActions.getInitData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);