import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';


class NewPost extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '新鲜的瓜',
        headerBackTitle: '取消',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <Text>NewPost</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({

});

export default NewPost;