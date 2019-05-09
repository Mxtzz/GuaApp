import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    static navigationOptions = {
        headerTitle: '首页',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
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
    }

    clickComment = (item) => {
        this.props.navigation.navigate('Content', {mainContent: item, articleId: item.id});
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

    _renderCard = ({item}) => {
        return(
            <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', marginBottom: 8 }}>
                <TouchableOpacity onPress={()=>{this.clickCard(item)}}>
                <View style={{ flex: 1, flexDirection: 'row', padding: 8 }}>
                    <Image source={require('../../img/header.png')} style={{ height: 40, width: 40, borderRadius: 20, borderColor: '#eee', borderWidth: 1 }}/>
                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        <Text style={{ fontSize: 14 }}>
                            {item.user ? item.user.nickname : "游客"}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#aaa' }}>
                            {item.createdAt}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                    <Text style={{ fontSize: 14, lineHeight: 20, color: '#000' }}>
                        {this.cutWords(item.content, 140)}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={()=>{this.clickComment(item)}}>
                            <Text style={{ flex: 1, paddingVertical: 8, fontSize: 14, textAlign: 'center' }}>
                                <_Icon name='bubble' size={14} color='#CCCCCC' />
                                {` ${item.comments.length}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={()=>{this.clickComment(item)}}>
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
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
            <Loading/>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.articleList}
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

                    <View style={styles.addMemoContainer}>
                        <Button
                            icon={
                                <_Icon
                                    name='pen'
                                    size={28}
                                    color='#FFEECC'
                                />
                            }
                            title=''
                            buttonStyle={styles.addMemo}
                            onPress={() => { this.props.navigation.navigate('NewPost') }}
                        />
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    addMemoContainer: {
        position: 'absolute',
        width: 46,
        height: 46,
        bottom: 20,
        right: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addMemo: {
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
        articleList: article.articleList,
    };
};

const mapDispatchToProps = dispatch => {
    const articleActions = bindActionCreators(articleCreators, dispatch);

    return {
        getArticleList: articleActions.getArticleList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
