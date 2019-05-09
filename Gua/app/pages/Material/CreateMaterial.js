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
    TextInput,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as materialCreators from '../../actions/material';

import Calendar from '../../components/Calendar';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { CheckBox, Divider, Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
import Loading from '../../components/Loading';

const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class CreateMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(new Date()).add(-60, 'days').format('MM/DD/YYYY'),
            endDate: '',
            isEndDate: false,
            selectedDate: null,
            displayCalendar: false,
            openBalancesOnly: false,
            refreshing: false,
            refreshTip: false
        }
    }

    static navigationOptions = {
        headerTitle: '创建物资',
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
        this.props.getMaterialList();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.materialList && this.state.refreshing == true) {
            this.setState({
                refreshing: false
            });
        }
    }

    Confirm = () => {
        Alert.alert(
            `申请成功！`,
            '',
            [
                { text: '取消', onPress: () => { } },
                { text: '返回', onPress: () => this.props.navigation.goBack() },
            ],
            { cancelable: false }
        )
    }

    _getMaterial = () => {
        this.setState({
            refreshing: true,
            refreshTip: false
        });
        this.props.getMaterialList();
    }

    openCalendar = (isEndDate) => {
        if (isEndDate) {
            this.setState({
                isEndDate: isEndDate,
                displayCalendar: true,
                selectedDate: this.state.endDate != '' ? moment(new Date(this.state.endDate.replace(/-/g, '/'))).format('YYYY-MM-DD') : null
            });
        } else {
            this.setState({
                isEndDate: isEndDate,
                displayCalendar: true,
                selectedDate: this.state.startDate != '' ? moment(new Date(this.state.startDate.replace(/-/g, '/'))).format('YYYY-MM-DD') : null
            });
        }
    }

    onClickOpenBalance = () => {
        // test code
        // this._refreshARAccounts(this.props.customerID);
        this.setState({
            openBalancesOnly: !this.state.openBalancesOnly,
            startDate: this.state.openBalancesOnly ? moment(new Date()).add(-60, 'days').format('MM/DD/YYYY') : '',
            endDate: ''
        });
    }

    onDayPress = (day) => {
        if (this.state.isEndDate) {
            this.setState({
                displayCalendar: false,
                endDate: moment(new Date(day.dateString.replace(/-/g, '/'))).format('MM/DD/YYYY')
            });
        } else {
            this.setState({
                displayCalendar: false,
                startDate: moment(new Date(day.dateString.replace(/-/g, '/'))).format('MM/DD/YYYY')
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }} forceInset={{ bottom: 'never' }} >
                <View style={{ borderRadius: 8, margin: 6, padding: 16, backgroundColor: '#fff' }}>
                    <TextInput
                        style={styles.reason}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={(text) => { this.setState({ title: text }) }}
                        value={this.state.title}
                        placeholder='名称'
                    />
                </View>
                
                <View style={{ borderRadius: 8, margin: 6, padding: 16, backgroundColor: '#fff' }}>
                    <TextInput
                        style={styles.reason}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={(text) => { this.setState({ title: text }) }}
                        value={this.state.title}
                        placeholder='介绍...'
                    />
                </View>
                
                <View style={{ borderRadius: 8, margin: 6, padding: 16, backgroundColor: '#fff' }}>
                    <TextInput
                        style={styles.reason}
                        onChangeText={(text) => { this.setState({ title: text }) }}
                        value={this.state.title}
                        placeholder='数量'
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
    const { material } = state;

    return {
        materialList: material.materialList,
    };
};

const mapDispatchToProps = dispatch => {
    const materialActions = bindActionCreators(materialCreators, dispatch);

    return {
        createMaterial: materialActions.createMaterial
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMaterial);