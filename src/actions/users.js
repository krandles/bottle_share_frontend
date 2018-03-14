import api from '../api/adapter'

export const LOGIN = "LOGIN"

export function login(user) {
  return {
    type: LOGIN,
    payload: user
  }
}