import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-b5027.firebaseio.com/'
})

export default instance;