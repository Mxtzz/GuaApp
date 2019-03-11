import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput,
    Dimensions
} from 'react-native';

import { Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';
import ImagePicker from 'react-native-image-picker';

const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            avatarSource: null,
            videoSource: null
        }
    }

    static navigationOptions = {
        headerTitle: '新鲜的瓜',
        headerBackTitle: '取消',
        headerRightContainerStyle: {
            paddingRight: 10,
        },
        headerStyle: {
            // backgroundColor: '#eee'
        },
        headerTintColor: '#333',
        headerBackTitleStyle: {
            color: '#333'
        },
        headerRight: (
            <Button
                title='发送'
                type='outline'
                onPress={() => alert('This is a button!')}
            />
        ),
    };

    launchCamera() {
        // const options = {
        //     title: '选择图片',
        //     cancelButtonTitle: '取消',
        //     takePhotoButtonTitle: '拍照',
        //     chooseFromLibraryButtonTitle: '选择照片',
        //     customButtons: [
        //         { name: 'fb', title: 'Choose Photo from Facebook' },
        //     ],
        //     cameraType: 'back',
        //     mediaType: 'photo',
        //     videoQuality: 'high',
        //     durationLimit: 10,
        //     maxWidth: 300,
        //     maxHeight: 300,
        //     quality: 0.8,
        //     angle: 0,
        //     allowsEditing: false,
        //     noData: false,
        //     storageOptions: {
        //         skipBackup: true
        //     }
        // };

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        })
    }

    launchImageLibrary() {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(text) => this.setState({ input: text })}
                        value={this.state.input}
                        placeholder='分享新鲜的瓜...'
                    />
                </View>
                <View style={styles.footer}>
                    <Button
                        icon={
                            <_Icon
                                name='at-sign'
                                size={28}
                                color='#aaa'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={() => alert('This is a button!')}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='hash'
                                size={28}
                                color='#aaa'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={() => alert('This is a button!')}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='camera1'
                                size={28}
                                color='#aaa'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={this.launchCamera.bind(this)}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='image1'
                                size={28}
                                color='#aaa'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={this.launchImageLibrary.bind(this)}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='map-pin'
                                size={28}
                                color='#aaa'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={() => alert('This is a button!')}
                    />
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16
    },
    inputContainer: {
        flex: 1,
        padding: 16
    },
    footer: {
        height: 46,
        backgroundColor: '#f3f3f3',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default NewPost;