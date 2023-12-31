import {baseUrl} from "./url_helper.js"


// GET
export async function getReq(url, config = {}){

    const token = localStorage.getItem('jwt')
    
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            response.json()
            .then((data) => {
                if(response.ok){
                    resolve(data)
                } else {
                    reject(data)
                }
            })
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
}


// POST
export async function postReq(url, data, config = {}) {

    const token = localStorage.getItem('jwt')

    return new Promise((resolve, reject) => {

        //parametrage request data : Formdata ou JSON
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        if (!config.form) {
            headers['Content-Type'] = 'application/json'
        }

        fetch(`${baseUrl}${url}`, {
            method: 'POST',
            body: config.form ? data : JSON.stringify(data),
            headers: headers,
        })
        .then((response) => {
            response.json()
            .then((data) => {
                if (response.ok) {
                    resolve(data)
                } else {
                    reject(data)
                }
            })
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
}


// UPDATE
export async function updateReq(url, data, config = {}) {

    const token = localStorage.getItem('jwt')

    return new Promise((resolve, reject) => {
        
        //parametrage request data : Formdata ou JSON
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        if (!config.form) {
            headers['Content-Type'] = 'application/json'
        }

        fetch(`${baseUrl}${url}`, {
            method: 'UPDATE',
            body: config.form ? data : JSON.stringify(data),
            headers: headers,
        })
        .then((response) => {
            response.json()
            .then((data) => {
                if (response.ok) {
                    resolve(data)
                } else {
                    reject(data)
                }
            })
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
}


// DELETE
export async function deleteReq(url, id, config = {}) {

    const token = localStorage.getItem('jwt')

    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            response.json()
            .then((data) => {
                if (response.ok) {
                    resolve(data)
                } else {
                    reject(data)
                }
            })
            .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
    })
}