import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clubCreators from '../../actions/club';

import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { CheckBox, Divider, Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
import Loading from '../../components/Loading';

const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class Club extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            refreshTip: false
        }
    }

    static navigationOptions = {
            headerTitle: '加入社团',
            headerBackTitle: '取消',
            headerRightContainerStyle: {
                paddingRight: 10,
            },
            headerStyle: {
                // backgroundColor: '#eee'
            },
            headerTintColor: '#333',
            headerBackTitleStyle: {
                color: '#333'
            }
    };

    componentWillMount() {
        this.props.getClubList();
    }
    

    componentWillReceiveProps(nextProps) {
        if (nextProps.clubList && this.state.refreshing == true) {
            this.setState({
                refreshing: false
            });
        }
    }

    Confirm = () => {

    }

    _getClub = () => {
        this.setState({
            refreshing: true,
            refreshTip: false
        });
        this.props.getClubList();
    }

    renderClub = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={`T${index.toString()}`}
                style={{ flex: 1, flexDirection: 'column', backgroundColor: item.Checked ? '#fafafa' : '#fff', padding: 8 }}
                onPress={() => {}}
            >
                <View style={{flexDirection: 'row'}}>
                    <CheckBox
                        key={`C${index.toString()}`}
                        containerStyle={{ flex: 1, margin: 0, marginLeft: 0, marginRight: 0, padding: 0, borderWidth: 0, backgroundColor: 'transparent' }}
                        title={item.title}
                        checkedIcon={<_Icon style={{ color: '#b2cb36' }} size={14} name='checkmark' />}
                        uncheckedIcon={<_Icon style={{ color: '#ccc' }} size={14} name='minus' />}
                        checked={item.Checked}
                        onPress={() => {}}
                    />
                    {/* <Text style={{ textAlign: 'right', lineHeight: 20 }}>{`${item.count} 可用`}</Text> */}
                </View>
                
                <Text key={`T2${index.toString()}`}>
                    <Text key={`T3${index.toString()}`} style={{ color: '#999999' }}>{`详情：${item.content}`}</Text>
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }} forceInset={{ bottom: 'never' }} >
                    <View style={{ margin: 5, flex: 1 }}>
                        <View style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#b2cb36', flexDirection: 'row', padding: 8 }}>
                            <_Icon name='users' size={20} style={{ marginHorizontal: 8, color: '#fff' }} />
                            <Text style={{ fontSize: 16, color: '#fff' }}>选择社团</Text>
                        </View>
                        <Loading />
                        {this.props.clubList == null || this.props.clubList.length == 0 ?
                            <View style={[styles.selectMaterial, { alignItems: 'center', justifyContent: 'center' }]}>
                                <Text style={{ color: '#aaa' }}>没有可以加入的社团。</Text>
                            </View>
                            :
                            <FlatList
                                refreshing={this.state.refreshing}
                                onRefresh={this._getClub}
                                keyExtractor={(item, index) => index.toString()}
                                data={this.props.clubList}
                                renderItem={this.renderClub}
                                style={styles.selectMaterial}
                                ItemSeparatorComponent={() => {
                                    return <Divider style={{ backgroundColor: '#dedede', height: 1 }} />
                                }}
                            />
                        }
                    </View>

                    <View style={{ borderRadius: 8, margin: 10, padding: 16, backgroundColor: '#fff' }}>
                        <TextInput
                            style={styles.reason}
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={(text)=>{ this.setState({title: text}) }}
                            value={this.state.title}
                            placeholder='备注'
                        />
                    </View>

                    <SafeAreaView style={{ padding: 8, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                        <Button
                            title='返回'
                            titleStyle={{}}
                            buttonStyle={[styles.button, { backgroundColor: '#aaa' }]}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        />
                        <Button
                            title='确认'
                            // disabled={disabled}
                            titleStyle={{}}
                            buttonStyle={[styles.button, { backgroundColor: '#b2cb36' }]}
                            onPress={this.Confirm}
                        />
                    </SafeAreaView>
                {/* </View> */}

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: width / 3,
        shadowColor: '#000',
        height: 38,
        borderRadius: 3
    },

    selectMaterial: {
        flex: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#fff'
    },
    reason: {

    }
});

const mapStateToProps = state => {
    const { club } = state;

    return {
        clubList: club.clubList,
    };
};

const mapDispatchToProps = dispatch => {
    const clubActions = bindActionCreators(clubCreators, dispatch);

    return {
        getClubList: clubActions.getClubList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Club);