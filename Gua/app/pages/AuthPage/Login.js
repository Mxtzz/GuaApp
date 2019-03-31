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
    Linking,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../../actions/auth';

import DeviceInfo from 'react-native-device-info';
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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberIsChecked: false,
            displayConfig: false,
            showClearButton: false
        };
    }

    componentWillMount() {
        SessionUtil.get().then((res) => {
            if (res && res.email) {
                this.setState({
                    username: res.email,
                    password: res.password,
                    rememberIsChecked: res.rememberIsChecked
                });
            }
        })

        SessionUtil.get('config').then((res) => {
            if (res && res.config) {
                this.setState({ displayConfig: true });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn) {
            SessionUtil.get().then((res) => {
                if (res && res.isHomeTipsDisplay == true) {
                    NavigationUtil.navigateStack(this.props.navigation, 'Tutorial', 'Tutorial', 0, null);
                } else {
                    this.props.navigation.navigate('Home');
                }
            })
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
        this.props.navigation.navigate('SignUp', { email: this.state.username });
    }

    recoverOnClick = () => {
        this.refs.passwordInput.blur();
        this.refs.emailInput.blur();
        this.props.navigation.navigate('ResetPassword', { email: this.state.username });
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
                        <_Icon name='close' color='black' size={width / 40} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundImage}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Loading color='#fff' />
                    <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' scrollEnabled={false}>
                        <View style={styles.scroll}>
                            {this.state.cog ?
                                <Icon name='cog'
                                    type='font-awesome'
                                    color='#fff'
                                    containerStyle={{ position: 'absolute', top: 8, right: 8 }}
                                    onPress={() => {
                                        this.props.navigation.navigate('EditConfig');
                                    }}
                                    underlayColor='transparent'
                                /> : null
                            }
                            <View style={styles.logoContainer}>
                                <Image source={require('../../img/header.png')} style={styles.logo} />
                            </View>
                            <View style={styles.textInputContainer}>
                                <_Icon name='email' color='#ABD825' size={24} style={styles.loginIcon} />
                                <TextInput
                                    ref='emailInput'
                                    keyboardType='email-address'
                                    placeholder='Email'
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
                            <View style={styles.textInputContainer}>
                                <_Icon name='password' color='#ABD825' size={30} style={styles.loginIcon} />
                                <TextInput
                                    ref='passwordInput'
                                    placeholder='Password'
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
                            <Text style={[styles.buttonLabel, { color: 'white' }]}>
                                {this.props.signInMessage}
                            </Text>
                            <Button
                                buttonStyle={styles.signButton}
                                onPress={this.userLogin}
                                title='Sign In'
                                titleStyle={Platform.OS === 'android' ? { fontFamily: '' } : null}
                                disabled={this.state.username == '' || this.state.password == ''}
                                disabledStyle={styles.signButton}
                                disabledTitleStyle={[Platform.OS === 'android' ? { fontFamily: '' } : null, { color: 'rgba(255,255,255,0.3)' }]}
                            />
                            <CheckBox
                                title='Remember Me'
                                containerStyle={styles.checkBoxContainer}
                                textStyle={styles.checkboxlabelStyle}
                                checked={this.state.rememberIsChecked}
                                onPress={this.rememberOnClick}
                                // checkedIcon={<Image style={styles.checkboxStyle} source={require('../../img/check.png')} />}
                                // uncheckedIcon={<Image style={styles.checkboxStyle2} source={require('../../img/check2.png')} />}
                            />

                            <Button
                                buttonStyle={styles.signButton}
                                onPress={this.signUpOnClick}
                                title='Sign Up'
                                titleStyle={Platform.OS === 'android' ? { fontFamily: '' } : null}
                                backgroundColor='#698419'
                            />
                            <Text style={[styles.alignRight, styles.buttonLabel]}>Forgot password?</Text>
                            <Text style={[styles.alignRight, styles.recoverButton]} onPress={this.recoverOnClick}>Recover here</Text>
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
        backgroundColor: '#CCC'
    },
    scroll: {
        padding: 30,
        flexDirection: 'column',
        flex: 1
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        marginTop: 30,
        width: width / 6,
        height: width / 6,
        alignSelf: 'center'
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
        backgroundColor: '#ABD825',
        width: 20,
        height: 20,
        borderColor: '#ABD825',
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
        signInMessage: auth.signInMessage,
        isLoggedIn: auth.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        login: authActions.login
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
