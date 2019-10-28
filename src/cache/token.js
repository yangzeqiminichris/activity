import { getStorage, setStorage } from "./base";
import { updateAuthorization } from '../api/base'

export async function setToken (token) {
    setStorage('___token___', token)
    await updateAuthorization()
    return Promise.resolve()
}

export async function getToken () {
    let t = await getStorage('___token___')
    return t
}