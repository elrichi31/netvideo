import axios from 'axios';
// import dotenv from 'dotenv';

export const setFavorites = payload => ({
  type: 'SET_FAVORITE',
  payload,
});

export const deleteFavorite = payload => ({
  type: 'DELETE_FAVORITE',
  payload,
});

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logOutRequest = payload => ({
  type: 'LOG_OUT_REQUEST',
  payload,
});

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const getVideoSource = payload => ({
  type: 'GET_VIDEO_SOURCE',
  payload,
});

export const getSearch = payload => ({
  type: 'GET_VIDEO_SEARCH',
  payload,
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});

export const deleteNewFavorite = (payload) => {
  return (dispatch) => {
    axios({
      url: '/api/delete-movie',
      method: 'post',
      data: {
        id: payload,
      },
    })
      .then(({ data }) => dispatch(deleteFavorite(data)))
      .catch(err => dispatch(setError(err)));
  };
};

export const setNewFavorite = (payload) => {
  return (dispatch) => {
    axios.post('/api/user-movies', payload)
      .then(({ data }) => dispatch(setFavorites(data)))
      .catch(err => dispatch(setError(err)));
  };
};

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch(error => dispatch(setError(error)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => { dispatch(setError(err)); });
  };
};
