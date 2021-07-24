import axios from 'axios';
// const FormData = require('form-data');


export async function FetcherGet(url, { params, headers } = {}) {
    try {
        const response = await axios.get(url, { params, headers });
        if (response.status === 200) {
            return response.data;
        } else {
            return {
                code: -1,
                info: "gagal, fetcher error",
                data: response.data,
            }
        }
    } catch (error) {
        console.error(error);
        return {
            code: -1,
            info: "gagal, fetcher error",
        }
    }
}

export async function FetcherPost(url, data, { params, headers } = {}) {
    try {
        const response = await axios.post(url, data, { params, headers });
        if (response.status === 200) {
            return response.data;
        } else {
            return {
                code: -1,
                info: "gagal, fetcher error",
                data: response.data,
            }
        }
    } catch (error) {
        console.error(error);
        return {
            code: -1,
            info: "gagal, fetcher error",
        }
    }
}

export async function FetcherPostFormData(url, formData) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    } catch (error) {
        console.error(error);
        return {
            code: -1,
            info: "gagal, fetcher error",
        }
    }
}