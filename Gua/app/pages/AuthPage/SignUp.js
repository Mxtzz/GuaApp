import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../../actions/auth';

import { SafeAreaView } from 'react-navigation';
import { Button, Icon, CheckBox } from 'react-native-elements';

import SessionUtil from '../../utils/SessionUtil';
import NavigationUtil from '../../utils/NavigationUtil';
import Loading from '../../components/Loading';
import Logger from '../../utils/Logger';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);

const { height, width } = Dimensions.get('window');

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            password1: '',
            nickname: '',
            rememberIsChecked: false,
            displayConfig: false,
            showClearButton: false
        };
    }

    static navigationOptions = {
        headerTitle: '注册',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: 'rgba(0,0,0,0)'
        // },
        // headerTintColor: '#FFEECC',
    };

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSignup != this.props.isSignup && nextProps.isSignup) {
            Alert.alert(
                `${nextProps.signUpMessage}`,
                '',
                [
                    { text: '取消', onPress: () => {} },
                    { text: '登录', onPress: () => this.props.navigation.navigate('Login')},
                ],
                { cancelable: false }      
            )
            
        }
    }

    rememberOnClick = () => {
        this.setState({
            rememberIsChecked: !this.state.rememberIsChecked
        });
    };

    signUpOnClick = () => {
        this.refs.passwordInput.blur();
        this.refs.emailInput.blur();
        this.props.signup(this.state.username, this.state.password, this.state.nickname);
    }

    userLogin = () => {
        this.refs.passwordInput.blur();
        this.refs.emailInput.blur();
    };

    renderClearButton() {
        if (this.state.showClearButton == true && this.state.username != '') {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                    <TouchableOpacity style={styles.clearButton} onPress={() => this.setState({ username: '', showClearButton: false })}  >
                        <_Icon name='delete' color='black' size={14} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../img/bg.jpg')} style={styles.backgroundImage}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Loading color='#fff' />
                    <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' scrollEnabled={false}>
                        <View style={styles.scroll}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../../img/header.png')} style={styles.logo} />
                            </View>
                            <View style={styles.textInputContainer}>
                                <_Icon name='user' color='#ABD825' size={24} style={styles.loginIcon} />
                                <TextInput
                                    ref='emailInput'
                                    placeholder='姓名'
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    value={this.state.nickname}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(text) => {
                                        this.setState({
                                            nickname: text
                                        });
                                    }}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <_Icon name='user' color='#ABD825' size={24} style={styles.loginIcon} />
                                <TextInput
                                    ref='emailInput'
                                    keyboardType='email-address'
                                    placeholder='邮箱/手机号/用户名'
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    value={this.state.username}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(text) => {
                                        this.setState({
                                            username: text,
                                            showClearButton: text != ''
                                        });
                                    }}
                                />
                                {this.renderClearButton()}
                            </View>

                            <Text style={[styles.buttonLabel, { color: 'white' }]}>
                                {this.props.signInMessage}
                            </Text>
                            {/* <Button
                                buttonStyle={styles.signButton}
                                onPress={this.userLogin}
                                title='获取验证码'
                                disabled={this.state.username == ''}
                                disabledStyle={styles.signButton}
                                disabledTitleStyle={[{ color: 'rgba(255,255,255,0.3)' }]}
                            /> */}

                            {/* <View style={styles.textInputContainer}>
                                <_Icon name='key' color='#ABD825' size={24} style={styles.loginIcon} />
                                <TextInput
                                    ref='passwordInput'
                                    placeholder='请输入验证码'
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        });
                                    }}
                                />
                            </View> */}

                            <View style={styles.textInputContainer}>
                                <_Icon name='key' color='#ABD825' size={24} style={styles.loginIcon} />
                                <TextInput
                                    ref='passwordInput'
                                    placeholder='请输入密码'
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        });
                                    }}
                                />
                            </View>
                            <View style={[styles.textInputContainer, this.state.password != this.state.password1 ? { borderColor: '#f00', borderWidth: 1 } : {}]}>
                                <_Icon name='key' color='#ABD825' size={24} style={styles.loginIcon} />
                                <TextInput
                                    ref='passwordInput'
                                    placeholder='请再次输入密码'
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    value={this.state.password1}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password1: text
                                        });
                                    }}
                                />
                            </View>

                            <Button
                                buttonStyle={styles.signButton}
                                onPress={this.signUpOnClick}
                                title='注  册'
                                disabled={this.state.username == '' || this.state.password == '' || this.state.password != this.state.password1}
                                backgroundColor='#698419'
                                disabledStyle={styles.signButton}
                                disabledTitleStyle={[{ color: 'rgba(255,255,255,0.3)' }]}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    scroll: {
        padding: 30,
        flexDirection: 'column',
        flex: 1
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    logo: {
        marginTop: 30,
        width: 80,
        height: 80,
        alignSelf: 'center',
        borderRadius: 40
    },
    url: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: width / 20,
        height: height / 15,
        borderRadius: 3
    },
    loginIcon: {
        alignSelf: 'center',
        marginLeft: 5
    },
    textInput: {
        height: height / 15,
        fontSize: 15,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        padding: 10,
        flex: 1
    },
    signButton: {
        backgroundColor: '#81AC00',
        width: width - 60,
        shadowColor: '#000',
        height: height / 15,
        marginBottom: 16,
        borderRadius: 3
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    recoverButton: {
        color: '#95BB25',
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    checkboxlabelStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'normal'
    },
    checkboxStyle: {
        backgroundColor: '#fff',
        width: 20,
        height: 20,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 3
    },
    checkboxStyle2: {
        backgroundColor: '#fff',
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000'
    },
    checkBoxContainer: {
        marginTop: 0,
        marginBottom: 16,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        borderWidth: 0,
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        width: 150
    },
    clearButton: {
        borderWidth: 1,
        borderColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center',
        width: height / 28,
        height: height / 28,
        backgroundColor: '#cccccc',
        borderRadius: 100
    }
});

const mapStateToProps = state => {
    const { auth } = state;

    return {
        isSignup: auth.isSignup,
        signUpMessage: auth.signUpMessage
    };
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        signup: authActions.signup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
