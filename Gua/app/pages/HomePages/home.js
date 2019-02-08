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

import { Button } from 'react-native-elements';
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
            <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <Text>Home</Text>
                <View style={{ flex: 1 }}>
                    <View style={styles.addMemoContainer}>
                        {/* <TouchableHighlight
                            onPress={() => { this.props.navigation.navigate('NewPost') }}
                        >
                            <_Icon
                                name='pen'
                                size={28}
                                color='#FFEECC'
                            />
                        </TouchableHighlight> */}
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

export default Home;