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

import { Icon, ListItem } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class User extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '我的',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

    joinClub = () => {
        this.props.navigation.navigate('Club');
    }

    createMaterial = () => {
        this.props.navigation.navigate('CreateMaterial');
    }

    myArticle = () => {
        this.props.navigation.navigate('MyArticles');
    }

    setting = () => {
        this.props.navigation.navigate('Setting');
    }

    material = () => {
        this.props.navigation.navigate('Material');
    }

    returnMt = () => {
        this.props.navigation.navigate('ReturnMt');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <View style={styles.userInfo}>
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                        source={require('../../img/header.png')}
                    />
                    <Text style={{ padding: 8, fontSize: 18, fontWeight: '600' }}>{`${this.props.auth.nickname}`}</Text>
                    <Text style={{ color: '#666' }}>这里本来可以显示签名</Text>
                </View>
                <View style={styles.settings}>
                    <ListItem
                        title="加入社团"
                        onPress={this.joinClub}
                        containerStyle={{ paddingVertical: 4, borderTopColor: '#ccc', borderTopWidth: 1, marginBottom: 6 }}
                        rightIcon={<Icon
                            name='chevron-small-right'
                            type='entypo'
                            size={width / 12}
                            color='gray'
                        />}
                    />
                    {this.props.auth.auth == 1 ?
                    <ListItem
                        title="创建物品"
                        onPress={this.createMaterial}
                        containerStyle={{ paddingVertical: 4, borderTopColor: '#ccc', borderTopWidth: 1, marginBottom: 6 }}
                        rightIcon={<Icon
                            name='chevron-small-right'
                            type='entypo'
                            size={width / 12}
                            color='gray'
                        />}
                    />
                    : null }

                    <ListItem
                        title="我的发帖"
                        onPress={this.myArticle}
                        containerStyle={{ paddingVertical: 4, borderTopColor: '#ccc', borderTopWidth: 1 }}
                        // leftAvatar={{ source: { uri: item.avatar_url } }}
                        rightIcon={<Icon
                            name='chevron-small-right'
                            type='entypo'
                            size={width / 12}
                            color='gray'
                        />}
                    />
                    <ListItem
                        title="申请物资"
                        onPress={() => {this.material()}}
                        containerStyle={{ paddingVertical: 4, borderTopColor: '#ccc', borderTopWidth: 1 }}
                        // leftAvatar={{ source: { uri: item.avatar_url } }}
                        rightIcon={<Icon
                            name='chevron-small-right'
                            type='entypo'
                            size={width / 12}
                            color='gray'
                        />}
                    />
                    <ListItem
                        title="归还物资"
                        onPress={() => {this.returnMt()}}
                        containerStyle={{ paddingVertical: 4, borderTopColor: '#ccc', borderTopWidth: 1 }}
                        rightIcon={<Icon
                            name='chevron-small-right'
                            type='entypo'
                            size={width / 12}
                            color='gray'
                        />}
                    />
                    <ListItem
                        title="设置"
                        onPress={() => {this.setting()}}
                        containerStyle={{ paddingVertical: 4, borderTopColor: '#ccc', borderTopWidth: 1 }}
                        rightIcon={<Icon
                            name='chevron-small-right'
                            type='entypo'
                            size={width / 12}
                            color='gray'
                        />}
                    />
                    
                </View>
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    settings: {
        // backgroundColor: '#eee'
    },
    addMemo: {
        // position:'absolute',
        width: 46,
        height: 46,
        borderRadius: 46,
        shadowColor: '#333',
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        backgroundColor: 'tomato',
        bottom: 20,
        right: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfo: {
        alignItems: 'center',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },
    userFriends: {
        paddingVertical: 8,
        paddingHorizontal: 26,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userFriendsBlock: {

    }
});

const mapStateToProps = state => {
    const { auth } = state;

    return {
        auth
    };
};

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(authCreators, dispatch);

    return {
        // createArticle: authActions.createArticle
        // authActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);