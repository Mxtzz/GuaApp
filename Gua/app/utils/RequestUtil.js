import Logger from '../utils/Logger';
import * as appSettings from '../constants/AppSettings';

const request = async (url, method, body, responesType = 'JSON') => {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        if (method == 'get') {
            headers.append('Content-Type', 'text/html');
        } else {
            headers.append('Content-Type', 'application/json');
        }
        headers.append('Accept', 'application/json');
        headers.append('Cache-Control', 'no-cache');
        headers.append('User-Agent', appSettings.USERAGENT);

        let token = (new Date()).getTime();

        fetch(url, {
            method,
            headers: headers,
            body: body
        }).then((response) => {
            if (response.status == 307 || response.status == 301) {
                return request(response.headers.get('location'), method, body, responesType);
            } else if (response.status == 200) {
                if (responesType == 'JSON') {
                    return new Promise((resolve2, reject2) => {
                        response.json().then((data) => {
                            resolve2(data);
                        }).catch((error) => {
                            reject2(error);
                        });
                    });
                } else {
                    return new Promise((resolve2, reject2) => {
                        response.text().then((text) => {
                            resolve2(text);
                        }).catch((error) => {
                            reject2(error);
                        });
                    });
                }
            } else {
                reject({ status: response.status, statusText: response.statusText });
            }
        }).then((responseData) => {
            resolve(responseData);
        }).catch((error) => {
            reject(error.message);
        });
    });
};

export default {
    request
}