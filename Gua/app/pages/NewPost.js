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
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    static navigationOptions = {
        headerTitle: '新鲜的瓜',
        headerBackTitle: '取消',
        headerRightContainerStyle: {
            paddingRight: 10,
        },
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
        headerBackTitleStyle: {
            color: '#000'
        },
        headerRight: (
            <Button
                title='发送'
                buttonStyle={
                    backgroundColor = '#FFEECC'
                }
                type='outline'
                onPress={() => alert('This is a button!')}
            />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
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
                                name='image1'
                                size={28}
                                color='#FFEECC'
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
                                color='#FFEECC'
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
                                color='#FFEECC'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={() => alert('This is a button!')}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='map-pin'
                                size={28}
                                color='#FFEECC'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={() => alert('This is a button!')}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='at-sign'
                                size={28}
                                color='#FFEECC'
                            />
                        }
                        title=''
                        type='clear'
                        onPress={() => alert('This is a button!')}
                    />
                    <Button
                        icon={
                            <_Icon
                                name='pen'
                                size={28}
                                color='#FFEECC'
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
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default NewPost;