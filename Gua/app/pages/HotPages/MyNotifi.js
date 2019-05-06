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

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class MyNotifi extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '消息',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

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
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>

                <FlatList
                    data={CommentData}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCommentCard}
                    extraData={this.state}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this.getMyOrderData}
                    style={{ flex: 1, backgroundColor: '#eee' }}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    
});


const CommentData = [
    {
        id: 0,
        headIconUrl: "",
        name: "Gua Test 1",
        content: "肥肠长的一段评论。",
        commentCount: 80,
        sendDate: "4月11日 22:00",
        role: 2
    },
    {
        id: 1,
        headIconUrl: "",
        name: "Gua Test 2",
        content: "棒极了👍",
        commentCount: "80",
        sendDate: "4月11日 18:00",
        role: 2
    },
    {
        id: 2,
        headIconUrl: "",
        name: "Gua Admin",
        content: "Make more Time.",
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

export default MyNotifi;