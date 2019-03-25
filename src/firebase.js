import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyBSyq_qFBnazkBZK-Frmg6w3jmcDncBCIw",
    authDomain: "expenses-tracker-edna.firebaseapp.com",
    databaseURL: "https://expenses-tracker-edna.firebaseio.com",
    projectId: "expenses-tracker-edna",
    storageBucket: "expenses-tracker-edna.appspot.com",
    messagingSenderId: "267797073645"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;
