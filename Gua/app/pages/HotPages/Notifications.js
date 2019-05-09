import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
    FlatList,
    Image
} from 'react-native';

import {
    ListItem
} from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleCreators from '../../actions/article';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class Notifications extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '通知',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

    componentWillMount() {
        this.props.getArticleList();
    }
    

    pressMyNotifi = () => {
        this.props.navigation.navigate('Content');
    }

    renderListHeader = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <View>
                    {/* <TouchableOpacity onPress={this.pressMyNotifi}>
                        <Text style={{ height: 38 }}>我的消息</Text>
                    </TouchableOpacity> */}
                    <ListItem
                        badge={{ value: 3, textStyle: { color: '#fff' }, containerStyle: { } }}
                        title='我的消息'
                        onPress={()=>{}}
                    />
                </View>
            </View>
        )
    }

    _renderCommentCard = ({ item }) => {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'row', marginBottom: 8 }}>
                <Image source={require('../../img/header.png')} style={{ height: 40, width: 40, margin: 8, borderRadius: 20, borderColor: '#eee', borderWidth: 1 }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16 }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize: 12, color: '#aaa' }}>
                                {item.sendDate}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                        <Text style={{ fontSize: 14, lineHeight: 20, color: '#333' }}>
                            {item.content}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        let articleList = [];
        if(this.props.articleList && this.props.articleList.length > 0){
            this.props.articleList.map(item => {
                if(item.user.auth == 1){
                    articleList.push(item);
                }
            })
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>

                <FlatList
                    data={articleList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCommentCard}
                    extraData={this.state}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this.getMyOrderData}
                    style={{ flex: 1, backgroundColor: '#eee' }}
                    ListHeaderComponent={this.renderListHeader}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    
});

const mapStateToProps = state => {
    const { article, auth } = state;

    return {
        articleList: article.articleList,
        userId: auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    const articleActions = bindActionCreators(articleCreators, dispatch);

    return {
        getArticleList: articleActions.getArticleList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);