/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
