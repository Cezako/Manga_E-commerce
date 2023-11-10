import {getReq, postReq, updateReq, deleteReq} from "./api_helper.js"

import {
    LOGIN, REGISTER, VERIFY_TOKEN,
    SERIES, SERIE, ADD_SERIE, UPDATE_SERIE, DELETE_SERIE, SEARCH_SERIES,
    MANGAS, MANGA,
    PROFIL
} from "./url_helper.js"


// AUTH
export const getVerifyToken = () => getReq(VERIFY_TOKEN)
export const postLogin = (loginParams) => postReq(LOGIN, loginParams)
export const postRegister = (registerParams) => postReq(REGISTER, registerParams)


// SERIES
export const getSeries = () => getReq(SERIES)
export const getSerie = () => getReq(SERIE)
export const addSerie = (data) => postReq(ADD_SERIE, data)
export const updateSerie = (data) => updateReq(UPDATE_SERIE, data)
export const deleteSerie = (productId) => deleteReq(DELETE_SERIE + productId)
export const getSearchedSeries = (searchParams) => getReq(SEARCH_SERIES + encodeURIComponent(searchParams))


// MANGAS
export const getManga = () => getReq(MANGA)
export const getMangas = () => getReq(MANGAS)


// USER
export const getProfil = () => getReq(PROFIL)