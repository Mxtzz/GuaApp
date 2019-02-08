import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

export class Splash extends Component {
    constructor(props){
        super(props);
        // this.spinValue = new Animated.Value(0);
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Main'); 
        }, 1000);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <SplashMain></SplashMain>
            </View>
        );
    }
}

export class SplashMain extends Component{
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

