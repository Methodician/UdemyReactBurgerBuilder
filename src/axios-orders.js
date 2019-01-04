import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-burger-builder-react.firebaseio.com/',
});

export default instance;