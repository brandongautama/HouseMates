import firebase from 'firebase';
import 'firebase/storage';

// config from the firebase project
// const config = {
//     apiKey: "AIzaSyDzH3Hy17z8FuvXy7069w9_sXEEoWQu4xo",
//     authDomain: "createhousehold.firebaseapp.com",
//     databaseURL: "https://createhousehold.firebaseio.com",
//     projectId: "createhousehold",
//     storageBucket: "createhousehold.appspot.com",
//     messagingSenderId: "451224208673"
// };

// Karl's Config Key
const config = {
    apiKey: 'AIzaSyCnveemGdAvO7VBz-NUmhyItfr1E3NfU58',
    authDomain: "manager-77e3c.firebaseapp.com",
    databaseURL: "https://manager-77e3c.firebaseio.com",
    projectId: "manager-77e3c",
    storageBucket: "manager-77e3c.appspot.com",
    messagingSenderId: "1062239771420"
};


// Karl's Config Key
// const config = {
//     apiKey: 'AIzaSyCnveemGdAvO7VBz-NUmhyItfr1E3NfU58',
//     authDomain: "manager-77e3c.firebaseapp.com",
//     databaseURL: "https://manager-77e3c.firebaseio.com",
//     projectId: "manager-77e3c",
//     storageBucket: "manager-77e3c.appspot.com",
//     messagingSenderId: "1062239771420"
// };


//This class should be used for all database access
export default class Firebase {
    static auth;
    static storage;

    static userInfo = {
        userName: "",
        userEmail: "",
        userPass: "",
    };

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.storage = firebase.storage();
    }
};
