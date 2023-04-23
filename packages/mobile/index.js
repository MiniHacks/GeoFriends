import { registerRootComponent } from 'expo';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
ReactNativeForegroundService.register();
import { LogBox } from "react-native"

LogBox.ignoreAllLogs(true);


import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
