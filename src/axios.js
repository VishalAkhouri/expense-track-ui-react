import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://expenses-tracker-edna.firebaseio.com/'
});

export default instance;
