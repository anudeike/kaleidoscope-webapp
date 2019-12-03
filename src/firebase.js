import firebase from 'firebase';

// configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkGlolF3sN2uPG9TPHzWdVQ-ue0e6URXo",
    authDomain: "kaleidoscope-app-92131.firebaseapp.com",
    databaseURL: "https://kaleidoscope-app-92131.firebaseio.com",
    projectId: "kaleidoscope-app-92131",
    storageBucket: "kaleidoscope-app-92131.appspot.com",
    messagingSenderId: "398603519978",
    appId: "1:398603519978:web:4cbab1d724cda0842ad493",
    measurementId: "G-MJPHFWQG7N"
};

// export for use
const firebaseApp = firebase.initializeApp(firebaseConfig);

//export database
export const fb = firebaseApp;