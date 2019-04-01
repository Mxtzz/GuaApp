import Logger from './Logger';
import store from 'react-native-simple-store';
import { AsyncStorage } from 'react-native';

export default class SessionUtil {
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        } catch (error) {
            // Error saving data
        }
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('TASKS');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    //https://reactnative.cn/docs/next/asyncstorage.html


    static get = async (key) => {
        return new Promise((resolve, reject) => {
            store.get(key ? key : 'session').then((res) => {
                resolve(res ? res : {});
            }).catch((error) => {
                Logger.logError(`SessionUtil: getSession ${key ? key : 'session'} failed ${JSON.stringify(error)}`);
                reject(error);
            });
        });
    }

    static update = async (obj, key) => {
        return store.update(key ? key : 'session', obj);
    }

    static delete = async (key) => {
        return store.delete(key ? key : 'session');
    }
}