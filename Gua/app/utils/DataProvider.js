import Logger from '../utils/Logger';
import NetUtil from '../utils/NetUtil';
import SessionUtil from '../utils/SessionUtil';
import requstUtil from '../utils/RequestUtil';
import RNFS from 'react-native-fs';
import {
    Platform, PermissionsAndroid, Linking, Alert
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as appSettings from '../constants/AppSettings';
import Moment from 'moment';


export default class DataProvider {

    static checkVersionUpgrade = async () => {
        const isConnected = await NetUtil.checkConnected();
        Logger.logError(`DataProvier: checkVersionUpgrade internet ${isConnected}`);

        if (isConnected) {
            let formData = new FormData();
            formData.append('Platform', Platform.OS);
            formData.append('Rev', appSettings.APP_VERSION);
            let results = null;
            try {
                results = await requstUtil.request(`${appSettings.DSDLINK_API_URL()}&Command=CheckUpgrade`, 'post', formData);
            } catch (error) {
                Logger.logError(`DataProvider: checkVersionUpgrade CheckUpgrade failed ${JSON.stringify(error)}`);
            }

            if (results && results.UpgradeToVersion != '' && appSettings.APP_VERSION < results.UpgradeToVersion) {
                await new Promise((resolve, reject) => {
                    let alertControls;
                    if (results.ForceUpgrade && results.ForceUpgrade == 'true') {
                        alertControls = [{
                            text: 'Upgrade', onPress: () => {
                                DataProvider.openUrl(results.UpgradeURL).catch(() => {
                                    Alert.alert('Upgrade Failed', 'Can not open link', [{ text: 'OK' }], { cancelable: false });
                                    resolve();
                                });
                            }
                        }];
                    } else {
                        alertControls = [{
                            text: 'Cancel', onPress: () => { resolve(); }
                        }, {
                            text: 'Upgrade', onPress: () => {
                                DataProvider.openUrl(results.UpgradeURL).catch(() => {
                                    Alert.alert('Upgrade Failed', 'Can not open link', [{ text: 'OK' }], { cancelable: false });
                                    resolve();
                                });
                            }
                        }];
                    }
                    Alert.alert('Found A New Version', 'A new DSDLink version is available, please upgrade.', alertControls, { cancelable: false });
                });
            }
        }
        // console.log('a');
        return Promise.resolve();
    }
}