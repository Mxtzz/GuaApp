import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class Hot extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '热门',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <Text>Home</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <_Icon name='heart' size={25} style={{ fontSize: 26, color: 'tomato' }} />
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
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
});

export default Hot;