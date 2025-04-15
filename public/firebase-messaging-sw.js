importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBGXDg3zFnf8g1luGKq3Q1gKQ4zcT78BAc",
  authDomain: "mainstreetdigital-enduser.firebaseapp.com",
  databaseURL: "https://mainstreetdigital-enduser-default-rtdb.firebaseio.com",
  projectId: "mainstreetdigital-enduser",
  storageBucket: "mainstreetdigital-enduser.appspot.com",
  messagingSenderId: "317991843833",
  appId: "1:317991843833:web:c9d335664e3c123e3d6f28",
  measurementId: "G-2DWFGY4229",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
