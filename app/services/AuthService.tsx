import http from '../utils/https'
import { LocalStorageHandler } from '../utils/localStorageService'

const signInUser = (data: any) => {
    return http.post('login', data)
}

const getCurrentUser = () => {
    return http.get('user', { headers: { "Authorization": `Bearer ${LocalStorageHandler.getUserToken()}` } })
}

const getUsersList = (perPage: number, page: number) => {
    return http.get(`user/list?per_page=${perPage}&page=${page}`, { headers: { "Authorization": `Bearer ${LocalStorageHandler.getUserToken()}` } })
}
const getRolesList = () => {
    return http.get('user/role/list', { headers: { "Authorization": `Bearer ${LocalStorageHandler.getUserToken()}` } })
}

const addUser = (newUserData: any) => {
    return http.post('user/create', newUserData, { headers: { "Authorization": `Bearer ${LocalStorageHandler.getUserToken()}` } })
}

const getUser = (id: number) => {
    return http.get(`user/${id}`, { headers: { "Authorization": `Bearer ${LocalStorageHandler.getUserToken()}` } })
}
const editUser = (id: number, editUserData: any) => {
    console.log(id)
    console.log(editUserData)
    return http.post(`user/${id}`, editUserData, { headers: { "Authorization": `Bearer ${LocalStorageHandler.getUserToken()}` } })
}


export const AuthService = {
    signInUser,
    getCurrentUser,
    getUsersList,
    addUser,
    getRolesList,
    getUser,
    editUser
}
