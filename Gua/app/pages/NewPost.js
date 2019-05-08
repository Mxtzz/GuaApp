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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleCreators from '../actions/article';

import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../selection.json';
import NavigationUtil from '../utils/NavigationUtil';

const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            content: "",
            title: "",
        }
    }

    static navigationOptions= ({navigation}) => {
        return{        
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
            }
        }
    };

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.createArticleResult && this.props.createArticleResult != nextProps.createArticleResult){
            NavigationUtil.reset(this.props.navigation, 'TabPage');
        }
    }

    createArticle = () => {
        this.props.createArticle(this.state.title, this.state.content);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} forceInset={{ bottom: 'never' }} >
                {/* <View style={styles.titleContainer}>
                    <TextInput
                        style={styles.title}
                        onChangeText={(text)=>{ this.setState({title: text}) }}
                        value={this.state.title}
                        placeholder='标题'
                    />
                </View> */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(text)=>{ this.setState({content: text}) }}
                        value={this.state.content}
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
                        onPress={() => alert('This is a button!')}
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
                        onPress={() => alert('This is a button!')}
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
                <View style={styles.addMemoContainer}>
                        <Button
                            icon={
                                <_Icon
                                    name='checkmark'
                                    size={28}
                                    color='#FFEECC'
                                />
                            }
                            title=''
                            buttonStyle={styles.addMemo}
                            onPress={this.createArticle}
                        />
                    </View>

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16
    },
    titleContainer: {
        padding: 16
    },
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
        justifyContent: 'space-around',
    },
    addMemoContainer: {
        position: 'absolute',
        width: 46,
        height: 46,
        bottom: 50,
        right: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addMemo: {
        // position: 'absolute',
        width: 46,
        height: 46,
        borderRadius: 46,
        shadowColor: '#333',
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = state => {
    const { article } = state;

    return {
        createArticleResult: article.createArticleResult
    };
};

const mapDispatchToProps = dispatch => {
    const articleActions = bindActionCreators(articleCreators, dispatch);

    return {
        createArticle: articleActions.createArticle
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);