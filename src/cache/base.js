export function setStorage (key, data) {
    sessionStorage.setItem(key, data)
}

export function getStorage (key) {
    // @ts-ignore
   /* return new Promise(async (resolve) => {
        try {
             await
            resolve(res)
        } catch (e) {
            resolve()
        }
    })*/
    let res = sessionStorage.getItem(key)
    return res
}
