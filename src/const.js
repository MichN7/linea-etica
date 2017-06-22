import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBXouqsFNkMX_3LMSLigOIOGFmwAe-_5Ug",
    authDomain: "linea-etica.firebaseapp.com",
    databaseURL: "https://linea-etica.firebaseio.com",
    projectId: "linea-etica",
    storageBucket: "linea-etica.appspot.com",
    messagingSenderId: "271449581294"
  };
  firebase.initializeApp(config);
  export const ref = firebase.database().ref();
