/** @format */

import { AppRegistry } from 'react-native';
import App from './app/containers/app.js';

// import App from './App';
// import Root from './app/root';
// import Splash from './app/pages/splash';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
