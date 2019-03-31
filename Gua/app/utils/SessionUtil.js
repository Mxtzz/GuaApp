import Logger from './Logger';
import store from 'react-native-simple-store';

export default class SessionUtil {
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