import Logger from './Logger';
import { NetInfo } from 'react-native';

export default class NetUtil {
    static checkConnected = async () => {
        let isConnected = false;
        try {
            isConnected = await NetInfo.isConnected.fetch();
            if (!isConnected) {
                isConnected = await NetInfo.isConnected.fetch();
            }
            Logger.logError(`NetUtil: checkConnected isConnected ${isConnected}`);
        } catch (error) {
            isConnected = false;
            Logger.logError(`NetUtil: checkConnected isConnected error ${error}`);
        }
        return Promise.resolve(isConnected);
    }
}