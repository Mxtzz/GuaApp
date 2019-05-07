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

    _renderCard = ({item}) => {
        return(
            <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', marginBottom: 8 }}>
                <TouchableOpacity onPress={()=>{this.clickCard(item)}}>
                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                    <Image source={require('../../img/header.png')} style={{ height: 40, width: 40, borderRadius: 20, borderColor: '#eee', borderWidth: 1 }}/>
                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        <Text style={{ fontSize: 14 }}>
                            {item.user ? item.user.username : "游客"}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#aaa' }}>
                            {item.createdAt}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee', padding: 8 }}>
                    <Text style={{ fontSize: 16, lineHeight: 20, color: '#000' }}>
                        {this.cutWords(item.content, 140)}
                    </Text>
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
                                {` ${item.commentCount}`}
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

const homeData = [
    {
        id: 0,
        headIconUrl: "",
        name: "Gua Test 1",
        content: "最近在项目中使用了部分的前端存储，之前只有一些简单的了解，今天就趁这个机会把前端存储进行深入研究一番。 写在开始 前端存储的好处： 方便网页的加载，避免了在发送请求收到响应前页面的空白期。",
        commentCount: 80,
        sendDate: "4月11日 22:00",
        role: 2
    },
    {
        id: 1,
        headIconUrl: "",
        name: "Gua Test 2",
        content: "楼下溜狗，有个小女孩跑到狗狗面前，问我：“阿姨，可以摸一下狗狗吗？ 我：“叫姐姐！” 小女孩：“阿姨，可以摸一下姐姐吗？”",
        commentCount: "80",
        sendDate: "4月11日 18:00",
        role: 2
    },
    {
        id: 2,
        headIconUrl: "",
        name: "Gua Admin",
        content: "ListItems are used to display rows of information, such as a contact list, playlist, or menu. They are very customizeable and can contain switches, avatars, badges, icons, and more.",
        commentCount: 86,
        sendDate: "4月10日 9:00",
        role: 1
    },
    {
        id: 2,
        headIconUrl: "",
        name: "Jack Ma",
        content: "ListItems are used to display rows of information, such as a contact list, playlist, or menu. They are very customizeable and can contain switches, avatars, badges, icons, and more.",
        commentCount: 86,
        sendDate: "4月10日 9:00",
        role: 1
    }
]

// export default Home;

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
