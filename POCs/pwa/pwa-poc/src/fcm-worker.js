//For more details look at the following articles:
// - https://firebase.google.com/docs/cloud-messaging/js/receive
// - https://angularfirebase.com/snippets/how-to-use-a-firebase-fcm-service-worker-with-angular-s-ngsw-service-worker/

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': 'YOUR-SENDER-ID'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();