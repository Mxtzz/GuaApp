import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authCreators from '../../actions/auth';

import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import Loading from '../../components/Loading';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);

const { height, width } = Dimensions.get('window');

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.navigation.getParam('email', '')
        };
    }

    componentWillUnmount() {
        this.props.resetResetPasswordMessage();
    }

    sentPasswordResetEmail = () => {
        this.props.sendPasswordResetEmail(this.state.email);
    }

    render() {
        return (
            <ImageBackground source={require('../../img/background.png')} style={styles.backgroundImage}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Loading color='#fff' />
                    <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' scrollEnabled={false}  >
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginBottom: width / 15,
                            paddingLeft: 15,
                            paddingTop: 15,
                            paddingRight: 15
                        }}>
                            <_Icon name='back'
                                color='#fff'
                                size={25}
                                style={{ padding: 0, backgroundColor: 'transparent' }}
                                onPress={() => this.props.navigation.goBack()}
                            />
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                <Text style={styles.text}>Password Recovery</Text>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 30 }}>
                            <Text style={styles.labelText}>Please input your email.</Text>
                            <View style={styles.textInputContainer}>
                                <_Icon name='email' color='#ABD825' size={25} style={styles.icon} />
                                <TextInput
                                    placeholder='Email'
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    value={this.state.email}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={text => this.setState({ email: text })}
                                />
                            </View>
                            <Text style={styles.buttonLabel}>
                                {this.props.resetPasswordMessage}
                            </Text>
                            <Button
                                disabled={this.state.email == ''}
                                disabledStyle={styles.sendEmailButton}
                                disabledTitleStyle={[Platform.OS === 'android' ? { fontFamily: '' } : null, { color: 'rgba(255,255,255,0.3)' }]}
                                buttonStyle={styles.sendEmailButton}
                                fontSize={18}
                                title='Send Email'
                                titleStyle={Platform.OS === 'android' ? { fontFamily: '' } : null}
                                onPress={this.sentPasswordResetEmail}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    labelText: {
        color: '#FFFFFF',
        fontSize: 18,
        backgroundColor: 'transparent',
        paddingBottom: 10
    },
    text: {
        color: '#FFFFFF',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    textInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: width / 20,
        height: height / 15,
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
    sendEmailButton: {
        shadowColor: '#000',
        height: height / 15,
        borderRadius: 3,
        backgroundColor: '#81AC00'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18
    }
});

const mapStateToProps = state => {
    const { auth } = state;

    return {
        resetPasswordMessage: auth.resetPasswordMessage
    };
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        resetResetPasswordMessage: authActions.resetResetPasswordMessage,
        sendPasswordResetEmail: authActions.sendPasswordResetEmail
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
