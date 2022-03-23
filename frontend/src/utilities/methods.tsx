
export const convertArrayToGETParams = params => {
    let data = []
    for (let key in params) {
        if (params[key].length > 0) {
            data.push(`${key}=${params[key]}`)
        }
    }
    return data.join("&")
}

export const getURLParameter = name =>
    decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&]+?)(&|#||$)')
            .exec(window.location.search) || [null, ''])[1]
            .replace(/\+/g, '%20')
    ) || null
