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
    TouchableWithoutFeedback
} from 'react-native';

import Calendar from '../../components/Calendar';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { CheckBox, Divider, Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../selection.json';
import Loading from '../../components/Loading';

const _Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { width, height } = Dimensions.get('window');

class Material extends Component {
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
        headerTitle: '申请物资',
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.distributorARAccounts && this.state.refreshing == true) {
            this.setState({
                refreshing: false
            });
        }
    }

    Confirm = () => {

    }

    _getMaterial = () => {
        this.setState({
            refreshing: true,
            refreshTip: false
        });
        this.props.payActions.getDistributorARAccounts(this.props.customerID);
    }

    _selectMaterial = (item, checked) => {
        this.props.payActions.selectARAccount(item, checked);
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

    renderMaterial = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={`T${index.toString()}`}
                style={{ flex: 1, flexDirection: 'row', backgroundColor: item.Checked ? '#fafafa' : '#fff', padding: 8, alignItems: 'center' }}
                onPress={() => this._selectMaterial(item, !item.Checked)}
            >
                <CheckBox
                    key={`C${index.toString()}`}
                    containerStyle={{ margin: 0, marginLeft: 0, marginRight: 0, borderWidth: 0, padding: 8, backgroundColor: 'transparent' }}
                    title={null}
                    checkedIcon={<_Icon style={{ color: '#b2cb36' }} size={24} name='multipleCheck2' />}
                    uncheckedIcon={<_Icon style={{ color: '#ccc' }} size={24} name='multipleUnCheck2' />}
                    checked={item.Checked}
                    onPress={() => this._selectMaterial(item, !item.Checked)}
                />
                <Text key={`T2${index.toString()}`}>
                    {`${item.DistributorName}: `}<Text key={`T3${index.toString()}`} style={{ fontWeight: 'bold' }}>{item.ARAccount}</Text>
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }} forceInset={{ top: 'always', bottom: 'never' }} >
                {/* <View style={{ flex: 1, backgroundColor: '#eee' }}> */}
                    {/* {this.state.refreshTip ?
                        <Text numberOfLines={2} style={{ alignSelf: 'center', paddingHorizontal: 8, paddingTop: 8, fontSize: 12, color: '#e0a602', fontWeight: 'bold' }}>{'Data updated.\r\nPull down screen to refresh.'}</Text>
                        : null} */}
                    <View style={{ margin: 10, flex: 1 }}>
                        <View style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#b2cb36', flexDirection: 'row', padding: 8 }}>
                            <_Icon name='file-text' size={20} style={{ marginHorizontal: 8, color: '#fff' }} />
                            <Text style={{ fontSize: 16, color: '#fff' }}>选择物品</Text>
                        </View>
                        <Loading />
                        {this.props.distributorARAccounts == null || this.props.distributorARAccounts == 0 ?
                            <View style={[styles.selectMaterial, { alignItems: 'center', justifyContent: 'center' }]}>
                                <Text style={{ color: '#aaa' }}>该社团没有可借用的物品。 </Text>
                            </View>
                            :
                            <FlatList
                                refreshing={this.state.refreshing}
                                onRefresh={this._getMaterial}
                                keyExtractor={(item, index) => index.toString()}
                                data={this.props.renderMaterial}
                                renderItem={this.renderMaterial}
                                style={styles.selectMaterial}
                                ItemSeparatorComponent={() => {
                                    return <Divider style={{ backgroundColor: '#dedede', height: 1 }} />
                                }}
                            />
                        }
                    </View>

                    <View style={{ borderRadius: 8, margin: 10, padding: 16, backgroundColor: '#fff' }}>
                        <Text style={{}}>Start Date</Text>
                        <TouchableOpacity onPress={() => this.openCalendar(false)}>
                            <View style={{ borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#dedede' }}>
                                <Text style={{ padding: 8, height: 35 }}>{this.state.startDate}</Text>
                                <View style={{ padding: 4, alignItems: 'center', justifyContent: 'center' }} >
                                    <_Icon name='calendar' size={20} style={{ color: '#b2cb36' }} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Text style={{ marginTop: 8 }}>End Date</Text>
                        <TouchableOpacity onPress={() => this.openCalendar(true)}>
                            <View style={{ borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#dedede' }}>
                                <Text style={{ padding: 8, height: 35 }}>{this.state.endDate}</Text>
                                <View style={{ padding: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <_Icon name='calendar' size={20} style={{ color: '#b2cb36' }} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center' }}
                            onPress={this.onClickOpenBalance}
                        >
                            <CheckBox
                                containerStyle={{ margin: 0, marginLeft: 0, marginRight: 0, borderWidth: 0, padding: 0, paddingVertical: 8, paddingLeft: 0, paddingRight: 8, backgroundColor: 'transparent' }}
                                title={null}
                                checkedIcon={<_Icon style={{ color: '#b2cb36' }} size={24} name='multipleCheck2' />}
                                uncheckedIcon={<_Icon style={{ color: '#ccc' }} size={24} name='multipleUnCheck2' />}
                                checked={this.state.openBalancesOnly}
                                onPress={this.onClickOpenBalance}
                            />
                            <Text style={{}}>Open Balances Only</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal transparent={true} animationType={'fade'} visible={this.state.displayCalendar} onRequestClose={() => { }}  >
                        <View style={{ width: width, height: height, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ displayCalendar: false })} >
                                <View style={{ flex: 1 }}></View>
                            </TouchableWithoutFeedback>
                            <Calendar
                                onDayPress={this.onDayPress}
                                style={{
                                    backgroundColor: '#fff',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    height: Platform.OS === 'android' ? 380 : 360
                                }}
                                markedDates={{ [this.state.selectedDate]: { selected: true, disableTouchEvent: false } }}
                            />
                        </View>
                    </Modal>

                    <SafeAreaView style={{ padding: 8, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                        <Button
                            title='Back'
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
    }
});

export default Material;