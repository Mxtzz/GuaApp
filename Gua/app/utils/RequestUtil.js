import Logger from '../utils/Logger';
import * as appSettings from '../constants/AppSettings';

const request = async (url, method, body, responesType = 'JSON') => {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        if (method == 'get') {
            headers.append('Content-Type', 'text/html');
        } else {
            headers.append('Content-Type', 'multipart/form-data');
        }
        headers.append('Accept', 'application/json');
        headers.append('Cache-Control', 'no-cache');
        headers.append('User-Agent', appSettings.DSDLINK_USERAGENT);

        let token = (new Date()).getTime();
        Logger.logError(`RequestUtil: token ${token} Url:${url} Body:${JSON.stringify(body)}`);

        fetch(url, {
            method,
            headers: headers,
            body: body
        }).then((response) => {
            if (response.status == 307 || response.status == 301) {
                //android will receive 307
                return request(response.headers.get('location'), method, body, responesType);
            } else if (response.status == 200) {
                if (responesType == 'JSON') {
                    return new Promise((resolve2, reject2) => {
                        response.json().then((data) => {
                            Logger.logError(`RequestUtil: response token ${token} response json ${JSON.stringify(data)}`);
                            resolve2(data);
                        }).catch((error) => {
                            Logger.logError(`RequestUtil: response token ${token} response json failed ${JSON.stringify(error)}`);
                            reject2(error);
                        });
                    });
                } else {
                    return new Promise((resolve2, reject2) => {
                        response.text().then((text) => {
                            Logger.logError(`RequestUtil: response token ${token} response text ${text}`);
                            resolve2(text);
                        }).catch((error) => {
                            Logger.logError(`RequestUtil: response token ${token} response text failed ${JSON.stringify(error)}`);
                            reject2(error);
                        });
                    });
                }
            } else {
                Logger.logError(`RequestUtil: response token ${token} response failed status=${response.status} statusText=${response.statusText}`);
                reject({ status: response.status, statusText: response.statusText });
            }
        }).then((responseData) => {
            resolve(responseData);
        }).catch((error) => {
            Logger.logError(`RequestUtil: catchError ${error.message} ${error.stack}`);
            reject(error.message);
        });
    });
};

export default {
    request
}