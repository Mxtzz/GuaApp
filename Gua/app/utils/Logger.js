import React from 'react';
import {
    Platform
} from 'react-native';
import RNFS from 'react-native-fs';
import Moment from 'moment';

class Logger {
    static path = Platform.OS === 'ios' ? `${RNFS.LibraryDirectoryPath}/Logs` : `${RNFS.ExternalDirectoryPath}/Logs`;

    static logError = async (message) => {
        let fileDir = `${Logger.path}/errors`;
        let exist = await RNFS.exists(fileDir);

        if (!exist) {
            await RNFS.mkdir(fileDir).catch((error) =>{
                // console.log(error.message);
            });
        }

        let fileName = `${fileDir}/${Moment(new Date()).format('YYYY-MM-DD')}.txt`;

        RNFS.appendFile(fileName, `[${Moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}] ${message}\n`, 'utf8').catch((err) => {
            // console.log(err.message);
        });
    };

    static getErrorLog = async (fileName) => {
        const filePath = `${Logger.path}/errors/${fileName}`;
        const exist = await RNFS.exists(filePath);

        return exist ? (await RNFS.readFile(filePath)).split('\n').reverse() : '';
    };

    static getAllLogs = async () => {
        return await RNFS.readDir(`${Logger.path}/errors`);
    };
}

export default Logger;