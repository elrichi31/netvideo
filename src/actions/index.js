export const setFavorites = payload => ({
    type: 'SET_FAVORITE',
    payload,
})

export const deleteFavorite = payload => ({
    type: 'DELETE_FAVORITE',
    payload
})

export const loginRequest = payload => ({
    type: 'LOGIN_REQUEST',
    payload
})

export const logOutRequest = payload => ({
    type: 'LOG_OUT_REQUEST',
    payload
})

export const registerRequest = payload => ({
    type: 'REGISTER_REQUEST',
    payload
})

export const getVideoSource = payload => ({
    type: 'GET_VIDEO_SOURCE',
    payload
})

export const getSearch = payload => ({
    type: 'GET_VIDEO_SEARCH',
    payload
})