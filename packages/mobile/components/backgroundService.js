// import ReactNativeForegroundService from '@supersami/rn-foreground-service';
// import Geolocation from 'react-native-geolocation-service';

// Geolocation.setRNConfiguration({
//   distanceFilter: 100, // Meters
//   desiredAccuracy: {
//     ios: 'best',
//     android: 'balancedPowerAccuracy',
//   },
//   // Android only
//   androidProvider: 'auto',
//   interval: 5000, // Milliseconds
//   fastestInterval: 10000, // Milliseconds
//   maxWaitTime: 5000, // Milliseconds
//   // iOS Only
//   activityType: 'other',
//   allowsBackgroundLocationUpdates: false,
//   headingFilter: 1, // Degrees
//   headingOrientation: 'portrait',
//   pausesLocationUpdatesAutomatically: false,
//   showsBackgroundLocationIndicator: false,
// });

// let locationSubscription = null;
// let locationTimeout = null;

// ReactNativeForegroundService.add_task(
//   () => {
//     console.log("Service code")
//     Geolocation.requestAuthorization('whenInUse').then((result) => {
//       console.log('Location Permissions: ', result);
//       // if has permissions try to obtain location with Geolocation service
//       if (result === 'granted') {
//         locationSubscription && locationSubscription();
//         locationSubscription = Geolocation.watchPosition(
//           (position) => {
//             locationSubscription();
//             locationTimeout && clearTimeout(locationTimeout);
//             console.log(position);
//           },
//           (error) => {
//             console.log(error.code, error.message);
//             locationSubscription && locationSubscription();
//             locationTimeout && clearTimeout(locationTimeout);
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 15000,
//             maximumAge: 10000,
//           },
//         );
//       } else {
//         locationSubscription && locationSubscription();
//         locationTimeout && clearTimeout(locationTimeout);
//         console.log('no permissions to obtain location');
//       }
//     });
//   },
//   {
//     delay: 1000,
//     onLoop: true,
//     taskId: 'taskid',
//     onError: (e) => console.log('Error logging:', e),
//   },
// );

// // ReactNativeForegroundService.start({
// //   id: 1244,
// //   title: "Foreground Service",
// //   message: "We are live World",
// //   icon: "ic_launcher",
// //   button: true,
// //   button2: true,
// //   buttonText: "Button",
// //   button2Text: "Anther Button",
// //   buttonOnPress: "cray",
// //   setOnlyAlertOnce: true,
// //   color: "#000000",
// //   progress: {
// //     max: 100,
// //     curr: 50,
// //   },
// // });
