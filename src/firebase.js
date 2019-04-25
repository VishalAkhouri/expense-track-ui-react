import app from 'firebase/app';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;
