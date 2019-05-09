import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
    Dimensions,
    FlatList,
    Image,
    Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleCreators from '../../actions/article';

import { Button, Icon } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainContent: this.props.navigation.state.params ? this.props.navigation.state.params.mainContent : '',
            articleId: this.props.navigation.state.params ? this.props.navigation.state.params.articleId : '',
            comment: '',
            isCommentModalDisplay: false
        }
    }

    static navigationOptions = {
        headerTitle: '详情',
        headerBackTitle: ''
    };

    componentWillMount() {
        this.props.getArticleById(this.state.articleId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.articleById && this.props.articleById != nextProps.articleById) {
            // console.log(nextProps.articleList)

        }
        if(nextProps.commentResult && nextProps.commentResult != this.props.commentResult){
            this.setState({ isCommentModalDisplay: false, comment: '' });
            this.props.getArticleById(this.state.articleId);
        }
    }

    saveComment = (id) => {
        // this.setState({ isCommentModalDisplay: false });
        this.props.comment(id, this.state.comment);
    }

    clickComment = () => {
        this.setState({ isCommentModalDisplay: true });
    }

    _keyExtractor = (item, index) => item.id;

    renderListHeader = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                    <Image source={require('../../img/header.png')} style={{ height: 40, width: 40, borderRadius: 20, borderColor: '#eee', borderWidth: 1 }} />
                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        <Text style={{ fontSize: 16 }}>
                            {this.state.mainContent.user ? this.state.mainContent.user.nickname : "游客"}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#aaa' }}>
                            {this.state.mainContent.createdAt}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                    <Text style={{ fontSize: 14, lineHeight: 20, color: '#333' }}>
                        {this.state.mainContent.content}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#eee', borderBottomColor: '#ff7400', borderBottomWidth: 2 }}>
                        <TouchableOpacity onPress={() => { this.clickComment() }}>
                            <Text style={{ flex: 1, paddingVertical: 8, fontSize: 14, textAlign: 'center' }}>
                                <_Icon name='bubble' size={14} color='#CCCCCC' />
                                {` 评论 ${this.state.mainContent.comments.length}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => { this.clickComment() }}>
                            <Text style={{ flex: 1, paddingVertical: 8, fontSize: 14, textAlign: 'center' }}>
                                <_Icon name='heart' size={14} color='#CCCCCC' />
                                {` 喜欢 ${this.state.mainContent.comments.length}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
                            <Text style={{ fontSize: 14, color: '#666' }}>
                                {item.user ? item.user.nickname : "游客"}
                            </Text>
                            <Text style={{ fontSize: 12, color: '#aaa' }}>
                                {item.createdAt}
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
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>

                <FlatList
                    data={this.props.articleById ? this.props.articleById.comments : []}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCommentCard}
                    extraData={this.state}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this.getMyOrderData}
                    style={{ flex: 1, backgroundColor: '#eee' }}
                    ListHeaderComponent={this.renderListHeader}
                />
                <Button
                    buttonStyle={{ backgroundColor: 'tomato', height: 50 }}
                    title='评论'
                    onPress={() => { this.clickComment() }}
                />

                <Modal visible={this.state.isCommentModalDisplay} transparent={true} onRequestClose={() => { this.setState({ isCommentModalDisplay: false }) }}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 12, height: height / 2.2, width: width - 40, maxWidth: 360, overflow: 'hidden' }}>
                            <View style={{ backgroundColor: '#FF7C4D', padding: 6 }}>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff' }}>评论</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ paddingVertical: 8, marginHorizontal: 8, justifyContent: 'center', borderBottomColor: '#FC7400', borderBottomWidth: 1 }}>
                                    <Text style={{ fontSize: 18, lineHeight: 20, textAlign: 'center' }}>{this.state.mainContent.content}</Text>
                                    {/* <Text style={{ color: '#777', lineHeight: 20, textAlign: 'center' }}>{this.state.selectedUser.Email}</Text> */}
                                </View>
                                <View style={{ flex: 1, marginVertical: 8 }}>
                                    <TextInput
                                        style={{ padding: 8 }}
                                        multiline={true}
                                        numberOfLines={10}
                                        onChangeText={(text) => { this.setState({ comment: text }) }}
                                        value={this.state.comment}
                                        placeholder='评论...'
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
                                <View style={{ flex: 1, backgroundColor: '#FF7C4D', marginRight: 1 }}>
                                    <TouchableOpacity onPress={() => this.setState({ isCommentModalDisplay: false })}>
                                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff', paddingVertical: 10 }}>取消</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#FF7C4D' }}>
                                    <TouchableOpacity onPress={()=>this.saveComment(this.state.articleId)}>
                                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff', paddingVertical: 10 }}>确定</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    const { article } = state;

    return {
        articleById: article.articleById,
        commentResult: article.commentResult
    };
};

const mapDispatchToProps = dispatch => {
    const articleActions = bindActionCreators(articleCreators, dispatch);

    return {
        getArticleById: articleActions.getArticleById,
        comment: articleActions.comment
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
