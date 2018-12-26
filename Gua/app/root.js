import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import rootSaga from './sagas/index';
import App from './containers/app';
// import {errorJSHandler, errorNativeHandler} from './utils/errorHandlerUtil';
// import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
// import PushNotificationUtil from './utils/PushNotificationUtil';
// import * as settings from './constants/AppSettings';

// setJSExceptionHandler(errorJSHandler);
// setNativeExceptionHandler(errorNativeHandler);

const store = configureStore();

// run root saga
store.runSaga(rootSaga);

//init setting
settings.initConfig();

const Root = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

// PushNotificationUtil.configure();

export default Root;
