import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Text
} from 'react-native';
import XDate from 'xdate';

const EmptyArray = [];

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        let currentMonth;
        if (props.current) {
            currentMonth = parseDate(props.current);
        } else {
            currentMonth = XDate();
        }
        this.state = {
            currentMonth
        };
    }

    componentWillReceiveProps(nextProps) {
        const current = parseDate(nextProps.current);
        if (current && current.toString('yyyy MM') !== this.state.currentMonth.toString('yyyy MM')) {
            this.setState({
                currentMonth: current.clone()
            });
        }
    }

    updateMonth = (day, doNotTriggerListeners) => {
        if (day.toString('yyyy MM') === this.state.currentMonth.toString('yyyy MM')) {
            return;
        }
        this.setState({
            currentMonth: day.clone()
        }, () => {
            if (!doNotTriggerListeners) {
                const currMont = this.state.currentMonth.clone();
                if (this.props.onMonthChange) {
                    this.props.onMonthChange(xdateToData(currMont));
                }
                if (this.props.onVisibleMonthsChange) {
                    this.props.onVisibleMonthsChange([xdateToData(currMont)]);
                }
            }
        });
    }

    _handleDayInteraction = (date, interaction) => {
        const day = parseDate(date);
        const minDate = parseDate(this.props.minDate);
        const maxDate = parseDate(this.props.maxDate);
        if (!(minDate && !isGTE(day, minDate)) && !(maxDate && !isLTE(day, maxDate))) {
            const shouldUpdateMonth = this.props.disableMonthChange === undefined || !this.props.disableMonthChange;
            if (shouldUpdateMonth) {
                this.updateMonth(day);
            }
            if (interaction) {
                interaction(xdateToData(day));
            }
        }
    }

    pressDay = (date) => {
        this._handleDayInteraction(date, this.props.onDayPress);
    }

    addMonth = (count) => {
        this.updateMonth(this.state.currentMonth.clone().addMonths(count, true));
    }

    renderDay = (day, id) => {
        const minDate = parseDate(this.props.minDate);
        const maxDate = parseDate(this.props.maxDate);
        let state = '';
        if (this.props.disabledByDefault) {
            state = 'disabled';
        } else if (sameDate(day, XDate()) && (minDate && !isGTE(day, minDate)) || (maxDate && !isLTE(day, maxDate))) {
            state = 'todayDisabled';
        } else if (sameDate(day, XDate())) {
            state = 'today';
        } else if ((minDate && !isGTE(day, minDate)) || (maxDate && !isLTE(day, maxDate))) {
            state = 'disabled';
        } else if (!sameMonth(day, this.state.currentMonth)) {
            state = 'disabled';
        }
        let dayComp;

        const DayComp = Day;
        const date = day.getDate();
        dayComp = (
            <DayComp
                key={id}
                state={state}
                onPress={this.pressDay}
                date={xdateToData(day)}
                marking={this.getDateMarking(day)}
            >
                {date}
            </DayComp>
        );
        return dayComp;
    }

    getDateMarking(day) {
        if (!this.props.markedDates) {
            return false;
        }
        const dates = this.props.markedDates[day.toString('yyyy-MM-dd')] || EmptyArray;
        if (dates.length || dates) {
            return dates;
        } else {
            return false;
        }
    }

    renderWeek(days, id) {
        const week = [];
        days.forEach((day, id2) => {
            week.push(this.renderDay(day, id2));
        }, this);

        if (this.props.showWeekNumbers) {
            week.unshift(this.renderWeekNumber(days[days.length - 1].getWeek()));
        }

        return (<View style={style.mainWeek} key={id}>{week}</View>);
    }

    render() {
        const days = page(this.state.currentMonth, this.props.firstDay);
        const weeks = [];
        while (days.length) {
            weeks.push(this.renderWeek(days.splice(0, 7), weeks.length));
        }
        const current = parseDate(this.props.current);
        if (current) {
            const lastMonthOfDay = current.clone().addMonths(1, true).setDate(1).addDays(-1).toString('yyyy-MM-dd');
            if (this.props.displayLoadingIndicator &&
                !(this.props.markedDates && this.props.markedDates[lastMonthOfDay])) {
            }
        }
        return (
            <View style={[style.container, this.props.style]}>
                <CalendarHeader
                    month={this.state.currentMonth}
                    addMonth={this.addMonth}
                />
                <View style={style.monthView}>{weeks}</View>
            </View>);
    }
}

export class CalendarHeader extends Component {
    static defaultProps = {
        monthFormat: 'MMMM yyyy',
    };
    constructor(props) {
        super(props);
    }
    addMonth = () => {
        this.props.addMonth(1);
    }

    substractMonth = () => {
        this.props.addMonth(-1);
    }

    shouldComponentUpdate(nextProps) {
        if (
            nextProps.month.toString('yyyy MM') !==
            this.props.month.toString('yyyy MM')
        ) {
            return true;
        }
        return false;
    }

    onPressLeft = () => {
        const { onPressArrowLeft } = this.props;
        if (typeof onPressArrowLeft === 'function') {
            return onPressArrowLeft(this.substractMonth);
        }
        return this.substractMonth();
    }

    onPressRight = () => {
        const { onPressArrowRight } = this.props;
        if (typeof onPressArrowRight === 'function') {
            return onPressArrowRight(this.addMonth);
        }
        return this.addMonth();
    }

    render() {
        let leftArrow = <View />;
        let rightArrow = <View />;
        let weekDaysNames = weekDayNames(this.props.firstDay);
        leftArrow = (
            <TouchableOpacity
                onPress={this.onPressLeft}
                style={style.arrow}
                hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
            >
                <Image
                    source={require('../img/CalendarPrevious.png')}
                    style={style.arrowImage}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
        );
        rightArrow = (
            <TouchableOpacity
                onPress={this.onPressRight}
                style={style.arrow}
                hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
            >
                <Image
                    source={require('../img/CalendarNext.png')}
                    style={style.arrowImage}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
        );

        return (
            <View>
                <View style={style.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text allowFontScaling={false} style={style.monthText} accessibilityTraits='header'>
                            {this.props.month.toString(this.props.monthFormat)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {leftArrow}
                        <View style={{ width: 30 }}></View>
                        {rightArrow}
                    </View>
                </View>
                
                <View style={style.week}>
                    {this.props.weekNumbers && <Text allowFontScaling={false} style={style.dayHeader}></Text>}
                    {weekDaysNames.map((day, idx) => (
                        <Text allowFontScaling={false} key={idx} accessible={false} style={style.dayHeader} numberOfLines={1} importantForAccessibility='no'>{day}</Text>
                    ))}
                </View>
                
            </View>
        );
    }
}

//day
export class Day extends Component {
    constructor(props) {
        super(props);
    }
    onDayPress = () => {
        this.props.onPress(this.props.date);
    }

    shouldComponentUpdate(nextProps) {
        const get = require('lodash.get');
        const isEqual = require('lodash.isequal');
        shouldUpdate = (a, b, paths) => {
            for (let i = 0; i < paths.length; i++) {
                const equals = isEqual(get(a, paths[i]), get(b, paths[i]));
                if (!equals) {
                    return true;
                }
            }
            return false;
        }
        return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress']);
    }

    render() {
        const containerStyle = [style.base];
        const textStyle = [style.text];
        const dotStyle = [style.dot];

        let marking = this.props.marking || {};
        if (marking && marking.constructor === Array && marking.length) {
            marking = {
                marking: true
            };
        }
        const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';

        if (marking.selected) {
            containerStyle.push(style.selected);
            if (marking.selectedColor) {
                containerStyle.push({ backgroundColor: '#FF7C4D' });
            }
            dotStyle.push(style.selectedDot);
            textStyle.push(style.selectedText);
        } 
        else if (isDisabled) {
            textStyle.push(style.disabledText);
        } 
        else if (this.props.state === 'today') {
            containerStyle.push(style.today);
            textStyle.push(style.todayText);
        }else if (this.props.state === 'todayDisabled') {
            containerStyle.push(style.today);
            textStyle.push(style.disabledText);
        }

        return (
            <TouchableOpacity
                style={containerStyle}
                onPress={this.onDayPress}
                activeOpacity={marking.activeOpacity}
                disabled={marking.disableTouchEvent}
            >
                <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
            </TouchableOpacity>
        );
    }
}
const style = StyleSheet.create({
    container: {},
    monthView: {},
    mainWeek: {
        marginTop: 7,
        marginBottom: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayContainer: {
        width: 32
    },
    
    //header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        backgroundColor:'#FF7C4D',
        height:46,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    monthText: {
        color: '#fff',
        margin: 10,
        fontSize:18
    },
    arrow: {
        padding: 10
    },
    arrowImage: {
        tintColor:'#fff',
        height:18,
        width:16
    },
    week: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dayHeader: {
        marginTop: 2,
        marginBottom: 7,
        width: 32,
        textAlign: 'center',
        color: '#FF7C4D'
    },

    //day
    base: {
        width: 32,
        height: 32,
        alignItems: 'center',
    },
    text: {
        marginTop: Platform.OS === 'android' ? 4 : 6,
        fontWeight: 'normal',
        color:'#FF7C4D',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        fontSize:16
    },
    alignedText: {
        marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
        borderRadius: 16,
        backgroundColor:'#FF7C4D'
    },
    today: {
        backgroundColor:'#eeeeee',
        borderRadius: 16,
    },
    todayText: {
        color:'#FF7C4D',
    },
    selectedText: {
        color:'#fff',
    },
    disabledText: {
        color:'#FFCC88',
    },
    
    selectedDot: {
        backgroundColor:'#FF7C4D'
    },
})

//interface
padNumber = (n) => {
    if (n < 10) {
        return '0' + n;
    }
    return n;
}

xdateToData = (xdate) => {
    const dateString = xdate.toString('yyyy-MM-dd');
    const ScheduledTime = xdate.toString('MM/dd/yyyy')
    return {
        year: xdate.getFullYear(),
        month: xdate.getMonth() + 1,
        day: xdate.getDate(),
        timestamp: XDate(dateString, true).getTime(),
        dateString: dateString,
        ScheduledTime: ScheduledTime,
        xdate:xdate
    };
}

parseDate = (d) => {
    if (!d) {
        return;
    } else if (d.timestamp) { // conventional data timestamp
        return XDate(d.timestamp, true);
    } else if (d instanceof XDate) { // xdate
        return XDate(d.toString('yyyy-MM-dd'), true);
    } else if (d.getTime) { // javascript date
        const dateString = d.getFullYear() + '-' + padNumber((d.getMonth() + 1)) + '-' + padNumber(d.getDate());
        return XDate(dateString, true);
    } else if (d.year) {
        const dateString = d.year + '-' + padNumber(d.month) + '-' + padNumber(d.day);
        return XDate(dateString, true);
    } else if (d) { // timestamp nuber or date formatted as string
        return XDate(d, true);
    }
}

//dateutils
sameMonth = (a, b) => {
    return a instanceof XDate && b instanceof XDate &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth();
}

sameDate = (a, b) => {
    return a instanceof XDate && b instanceof XDate &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

isGTE = (a, b) => {
    return b.diffDays(a) > -1;
}

isLTE = (a, b) => {
    return a.diffDays(b) > -1;
}

fromTo = (a, b) => {
    const days = [];
    let from = +a, to = +b;
    for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
        days.push(new XDate(from, true));
    }
    return days;
}

month = (xd) => {
    const year = xd.getFullYear(), month = xd.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
    const lastDay = new XDate(year, month, days, 0, 0, 0, true);

    return fromTo(firstDay, lastDay);
}

weekDayNames = (firstDayOfWeek = 0) => {
    let weekDaysNames = XDate.locales[XDate.defaultLocale].dayNamesShort;
    const dayShift = firstDayOfWeek % 7;
    if (dayShift) {
        weekDaysNames = weekDaysNames.slice(dayShift).concat(weekDaysNames.slice(0, dayShift));
    }
    return weekDaysNames;
}

page = (xd, firstDayOfWeek) => {
    const days = month(xd);
    let before = [], after = [];
    const fdow = ((7 + firstDayOfWeek) % 7) || 7;
    const ldow = (fdow + 6) % 7;
    firstDayOfWeek = firstDayOfWeek || 0;
    const from = days[0].clone();
    if (from.getDay() !== fdow) {
        from.addDays(-(from.getDay() + 7 - fdow) % 7);
    }
    const to = days[days.length - 1].clone();
    const day = to.getDay();
    if (day !== ldow) {
        to.addDays((ldow + 7 - day) % 7);
    }

    if (isLTE(from, days[0])) {
        before = fromTo(from, days[0]);
    }
    if (isGTE(to, days[days.length - 1])) {
        after = fromTo(days[days.length - 1], to);
    }
    return before.concat(days.slice(1, days.length - 1), after);
}