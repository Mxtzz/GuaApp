import DeviceInfo from 'react-native-device-info';
import SessionUtil from '../utils/SessionUtil';

export const config = {
    host: 'https',
    url: 'api.encompass8.com',
}

export const setConfig = (newConfig) => {
    config.host = newConfig.host ? newConfig.host : config.host;
    config.url = newConfig.url ? newConfig.url : config.url;
    SessionUtil.update({ config: config }, 'config');
}

export const initConfig = async () => {
    const session = await SessionUtil.get('config');
    if (session && session.config) {
        setConfig(session.config);
    }
    return Promise.resolve();
}

export const APP_VERSION = '19.04.-30';

export const GUA_API_URL = () => {
    return `http://127.0.0.1:6060/`;
}

export const USERAGENT = `DSDLink_${APP_VERSION}_${DeviceInfo.getSystemName()}_${DeviceInfo.getSystemVersion()}_${DeviceInfo.getBrand()}_${DeviceInfo.getModel()}`;

