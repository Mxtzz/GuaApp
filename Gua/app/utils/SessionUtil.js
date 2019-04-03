import Logger from './Logger';
// import store from 'react-native-simple-store';
import AsyncStorage from '@react-native-community/async-storage';

export default class SessionUtil {
    static updateData = async (key, val) => {
        try {
            await AsyncStorage.setItem(key ? key : 'session', val);
        } catch (error) {
            // Error saving data
        }
    }
    static getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            Logger.logError(`SessionUtil: getSession ${key ? key : 'session'} failed ${JSON.stringify(error)}`);
        }
    }

    static set = async (key) => {
        try {
            await AsyncStorage.setItem('session', JSON.stringify(key));
        } catch (error) {
            Logger.logError(`SessionUtil: getSession ${key ? key : 'session'} failed ${JSON.stringify(error)}`);
        }
    }

    static get = async () => {
        try {
            const value = await AsyncStorage.getItem('session');
            if (value !== null) {
                return value;
            }
        } catch (error) {
            Logger.logError(`SessionUtil: getSession failed ${JSON.stringify(error)}`);
        }
    }


    //https://reactnative.cn/docs/next/asyncstorage.html


    // static get = async (key) => {
    //     return new Promise((resolve, reject) => {
    //         store.get(key ? key : 'session').then((res) => {
    //             resolve(res ? res : {});
    //         }).catch((error) => {
    //             Logger.logError(`SessionUtil: getSession ${key ? key : 'session'} failed ${JSON.stringify(error)}`);
    //             reject(error);
    //         });
    //     });
    // }

    // static update = async (obj, key) => {
    //     return store.update(key ? key : 'session', obj);
    // }

    // static delete = async (key) => {
    //     return store.delete(key ? key : 'session');
    // }
}