import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fir-react-trial.firebaseio.com/',
});

export default instance;