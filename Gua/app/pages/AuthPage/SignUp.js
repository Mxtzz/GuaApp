import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../../actions/auth';

import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';

import DataProvider from '../../utils/DataProvider';
import Loading from '../../components/Loading';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);

const { height, width } = Dimensions.get('window');

class SignUp extends Component {
    constructor(props) {
        super(props);

        const email = this.props.navigation.getParam('email', '');

        this.state = {
            email: email,
            fullName: '',
            phone: '',
            showClearButton: email != '',
            displaySentEmail: false
        };
    }

    componentDidMount(){
        DataProvider.setPosition();
    }

    componentWillUnmount() {
        this.props.resetSignUpMessage();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signUpSuccess) {
            this.setState({
                displaySentEmail: true
            });
        }
    }

    sentCreateUser = () => {
        this.refs.nameInput.blur();
        this.refs.emailInput.blur();
        this.refs.phoneInput.blur();
        this.props.sendNewUserCreate(this.state.email, this.state.fullName, this.state.phone);
    }

    renderClearButton() {
        if (this.state.showClearButton == true && this.state.email != '') {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => this.setState({ email: '', showClearButton: false })}
                    >
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
            <ImageBackground source={require('../../img/background.png')} style={styles.backgroundImage}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Loading color='#fff' />
                    <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' scrollEnabled={false} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 16 }}>
                            <_Icon name='back'
                                color='#fff'
                                size={25}
                                style={{ padding: 0, backgroundColor: 'transparent' }}
                                onPress={() => this.props.navigation.goBack()}
                            />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <Text style={styles.text}>Sign Up</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 8, paddingRight: 30, paddingLeft: 30 }}>
                            <View style={styles.textInputContainer}>
                                <_Icon name='email' color='#ABD825' size={23} style={styles.icon} />
                                <TextInput
                                    ref='emailInput'
                                    keyboardType='email-address'
                                    placeholder='*Email'
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    value={this.state.email}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={text => this.setState({ email: text.trim(), showClearButton: text != '' })}
                                />
                                {this.renderClearButton()}
                            </View>
                            <View style={styles.textInputContainer}>
                                <_Icon name='account-name' color='#ABD825' size={30} style={styles.icon} />
                                <TextInput
                                    ref='nameInput'
                                    placeholder='*Full Name'
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    value={this.state.accountName}
                                    autoCapitalize='words'
                                    autoCorrect={false}
                                    onChangeText={text => this.setState({ fullName: text })}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <_Icon name='phone' color='#ABD825' size={30} style={styles.icon} />
                                <TextInput
                                    ref='phoneInput'
                                    placeholder='*Mobile Phone'
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    value={this.state.accountName}
                                    keyboardType='numeric'
                                    autoCorrect={false}
                                    onChangeText={text => this.setState({ phone: text })}
                                />
                            </View>
                            <Text style={[styles.buttonLabel, { color: 'white' }]}>
                                {this.props.signUpMessage}
                            </Text>
                            <Button
                                disabled={!(this.state.email !== '' && this.state.fullName !== '' && this.state.phone !== '')}
                                disabledStyle={styles.signUpButton}
                                disabledTitleStyle={[Platform.OS === 'android' ? { fontFamily: '' } : null, { color: 'rgba(255,255,255,0.3)' }]}
                                buttonStyle={styles.signUpButton}
                                fontSize={18}
                                title='Sign Up'
                                titleStyle={Platform.OS === 'android' ? { fontFamily: '' } : null}
                                onPress={this.sentCreateUser}
                            />
                        </View>
                    </ScrollView>

                    <Modal
                        animationType={'fade'}
                        transparent={true}
                        visible={this.state.displaySentEmail}
                        onRequestClose={() => { }}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: '#fff', alignSelf: 'center', borderRadius: 10, margin: 10 }}>
                                <View style={{ alignItems: 'center', margin: 20 }}>
                                    <Text style={{ fontSize: 26, fontWeight: 'normal', marginTop: 20 }}>{'Email sent successfully!'}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'normal', marginVertical: 20 }}>{'Please check the email from DSDlink and click the link in the email to reset the password.'}</Text>
                                </View>
                                <TouchableOpacity style={{
                                    backgroundColor: '#a7cb04',
                                    height: 40,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} onPress={() => {
                                    this.setState({ displaySentEmail: false });
                                    this.props.navigation.navigate('Login', { username: this.state.email });
                                }}>
                                    <Text style={{ color: '#fff', fontSize: 20 }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    text: {
        color: '#FFFFFF',
        fontSize: 25
    },
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: width / 20,
        height: height / 14,
        borderRadius: 3
    },
    icon: {
        marginLeft: 5,
        marginRight: 5,
        padding: 0,
        alignSelf: 'center',
    },
    textInput: {
        height: height / 15,
        fontSize: 15,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        padding: 8,
        flex: 1
    },
    signUpButton: {
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
        signUpMessage: auth.signUpMessage,
        signUpSuccess: auth.signUpSuccess
    };
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        sendNewUserCreate: authActions.sendNewUserCreate,
        resetSignUpMessage: authActions.resetSignUpMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
