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

export const DSDLINK_API_URL = () => {
    return `${config.host}://${config.url}/aspx1/API.aspx?Token=50c27001b4cb987c8d0667f7198bed94`;
}

export const DSDLINK_USERAGENT = `DSDLink_${APP_VERSION}_${DeviceInfo.getSystemName()}_${DeviceInfo.getSystemVersion()}_${DeviceInfo.getBrand()}_${DeviceInfo.getModel()}`;

