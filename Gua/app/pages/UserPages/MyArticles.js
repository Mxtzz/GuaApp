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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleCreators from '../../actions/article';

import Loading from '../../components/Loading';
import { Button, Icon } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class MyArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    static navigationOptions = {
        headerTitle: '我的发帖',
        headerBackTitle: '',
    };

    componentWillMount() {
        this.props.getArticleList();
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.articleList && this.props.articleList != nextProps.articleList && this.state.refreshing == true){
            this.setState({
                refreshing: false
            });
        }
        if(nextProps.deleteArticleResult && this.props.deleteArticleResult != nextProps.deleteArticleResult){
            this.props.getArticleList();
        }
    }

    clickComment = () => {
        console.log("click comment");
    }

    clickCard = (item) => {
        this.props.navigation.navigate('Content', {mainContent: item, articleId: item.id});
    }

    //超出字数省略
    cutWords = (str) => {
        let len = str.length;
        if(len <= 120){
            return str;
        } 
        return str.slice(0,117) + "...";
    }

    _keyExtractor = (item, index) => item.id;

    deleteArticle = (id) => {
        this.props.deleteArticle(id);
    }

    _renderCard = ({item}) => {
        return(
            <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', marginBottom: 8 }}>
                <TouchableOpacity onPress={()=>{this.clickCard(item)}}>
                <View style={{ flexDirection: 'row', flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                    <Text style={{ flex: 1, fontSize: 16, lineHeight: 20, color: '#000' }}>
                        {this.cutWords(item.content, 140)}
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', margin: 8 }}>
                        <TouchableOpacity style={styles.clearButton} onPress={() => this.deleteArticle(item.id)}  >
                            <_Icon name='trash-2' color='black' size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{flex: 1, borderRightWidth: 1, borderRightColor: '#eee'}}>
                        <TouchableOpacity onPress={()=>{this.clickComment()}}>
                            <Text style={{ flex: 1, paddingVertical: 8, fontSize: 14, textAlign: 'center' }}>
                                <_Icon name='bubble' size={14} color='#CCCCCC' />
                                {` ${item.comments.length}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={()=>{this.clickComment()}}>
                            <Text style={{ flex: 1, paddingVertical: 8, fontSize: 14, textAlign: 'center' }}>
                                <_Icon name='heart' size={14} color='#CCCCCC' />
                                {` ${item.comments.length}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let articleList = [];
        if(this.props.articleList && this.props.userId && this.props.articleList.length > 0){
            this.props.articleList.map(item => {
                if(item.userId == this.props.userId){
                    articleList.push(item);
                }
            })
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
            <Loading/>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={articleList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderCard}
                        extraData={this.state}
                        refreshing={this.state.refreshing}
                        onRefresh={()=>{
                            this.setState({ refreshing: true });
                            this.props.getArticleList();
                        }}
                        style={{ flex: 1, backgroundColor: '#eee' }}
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 38,
        shadowColor: '#000',
        height: 38,
        borderRadius: 3
    },
});

const mapStateToProps = state => {
    const { article, auth } = state;

    return {
        articleList: article.articleList,
        userId: auth.userId,
        deleteArticleResult: article.deleteArticleResult
    };
};

const mapDispatchToProps = dispatch => {
    const articleActions = bindActionCreators(articleCreators, dispatch);

    return {
        getArticleList: articleActions.getArticleList,
        deleteArticle: articleActions.deleteArticle
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);
