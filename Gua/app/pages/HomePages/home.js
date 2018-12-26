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

class Home extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: '首页',
        headerBackTitle: '',
        // headerStyle: {
        //     backgroundColor: '#333'
        // },
        // headerTintColor: '#FFEECC',
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Home</Text>
                <TouchableHighlight
                    onPress={() => { this.props.navigation.navigate('NewPost') }}
                >
                    <View style={styles.addMemo}>
                        <_Icon
                            name='pen'
                            size={28}
                            color='#FFEECC'
                        />
                    </View>
                </TouchableHighlight>
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

export default Home;