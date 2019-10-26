// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBcBPpGK0yOldd8OTBV166U9l5qf7InMZw',
    authDomain: 'pwa-fcm-poc.firebaseapp.com',
    databaseURL: 'https://pwa-fcm-poc.firebaseio.com',
    projectId: 'pwa-fcm-poc',
    storageBucket: 'pwa-fcm-poc.appspot.com',
    messagingSenderId: '751640522269',
    appId: '1:751640522269:web:429439f51a8b761a5520f4',
    measurementId: 'G-14PCE9WVYC'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
