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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'tomato' }}>
                <Text>NewPost</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({

});

export default NewPost;