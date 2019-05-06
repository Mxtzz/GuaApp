import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
    Dimensions,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../../actions/auth';

import { ListItem, Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class Setting extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '设置',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

    componentWillReceiveProps(nextProps) {
        // if (nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn) {
        //     SessionUtil.get().then((res)=>{
        //         res = JSON.parse(res);
        //         this.props.navigation.navigate('Home');
        //     });
        // }
    }

    logout = () => {
        // this.props.logout();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <View style={styles.userInfo}>
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                        source={require('../../img/header.png')}
                    />
                    <Text style={{ padding: 8, fontSize: 18, fontWeight: '600' }}>User</Text>
                    <Text style={{ color: '#666' }}>签名</Text>
                </View>
                
                <View style={styles.settings}>
                    <ListItem
                        title="手机号码"
                        // leftAvatar={{ source: { uri: item.avatar_url } }}
                    />
                    <ListItem
                        title="手机号码"
                        // leftAvatar={{ source: { uri: item.avatar_url } }}
                    />
                    <ListItem
                        title="手机号码"
                        // leftAvatar={{ source: { uri: item.avatar_url } }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Button
                        buttonStyle={styles.signButton}
                        onPress={this.logout}
                        title='注销'
                        backgroundColor='tomato'
                    />
                </View>
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    signButton: {
        backgroundColor: 'tomato',
        width: width - 60,
        shadowColor: '#000',
        height: height / 15,
        marginBottom: 16,
        borderRadius: height / 15
    },
});

const mapStateToProps = state => {
    const { auth } = state;

    return {
        isLoggedOut: auth.isLoggedOut
    };
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        logout: authActions.logout
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);