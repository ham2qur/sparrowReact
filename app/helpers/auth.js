const axios = require('axios');
const tag = 'sparrow-travel-token';

export function signIn(username, password) {

  return axios.post('http://localhost:3000/api/signin', {
    username,
    password,
  })
  .then(function (response) {
    if (response.data.token) {
      saveToken(response.data.token);
      return response.data;
    }else {
      return response.data;
    }
  })
  .catch(function (err) {
    return err;
  });

}

export function signUp(username, email, password) {

  return axios.post('http://localhost:3000/api/me', {
    username,
    password,
    email,
  })
  .then((response) => {
    if (response.data.token) {
      saveToken(response.data.token);
      return response;
    }else {
      return response;
    }
  })
  .catch((err) => {
    return err;
  });
}

export function forgotPassword(username, email, password) {

  return axios.put('http://localhost:3000/api/me', {
    username,
    password,
    email,
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    return err;
  });
}

const saveToken = (token)=> {
  window.localStorage.setItem(tag, token);
};

export function isAuth() {
  return !!window.localStorage.getItem(tag);
}

export function logout() {
  window.localStorage.removeItem(tag);
  location.reload();
  location.href = location.origin;

}

export const AUTH_TOKEN = window.localStorage.getItem(tag);
