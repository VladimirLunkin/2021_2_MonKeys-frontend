/* eslint-disable no-unused-vars */
const serverAddress = 'http://127.0.0.1:80';
const profileURL = '/api/v1/profile'
const authURL = '/api/v1/session'
const feedURL = '/api/v1/feed'

// Data-validation


// eslint-disable-next-line no-unused-vars
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
