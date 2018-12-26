import {
    Platform,
    Alert
} from 'react-native';
import { fork, take, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';



export function* watchGetInitData() {
    yield takeLatest(types.GET_INIT_DATA, getInitData);
}
