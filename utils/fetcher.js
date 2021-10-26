import axios from 'axios';
import { notification } from 'antd';

export function showError(msg) {
    notification["error"]({
        message: 'Galat!',
        description: msg
    });
}

export function showErrorCustom(msg, desc) {
    notification["error"]({
        message: msg,
        description: desc
    });
}

export async function FetcherGet(url, { params, headers, silent = false } = {}) {
    try {
        console.log('%c FetcherGet: ' + url, 'background: #222; color: #bada55');
        console.log('%c withParam: ' + JSON.stringify(params), 'background: #222; color: #bada55');

        const response = await axios.get(url, { params, headers });

        return response
    } catch (error) {
        if (error?.response?.data?.message === "report not found") {
            showErrorCustom("Gagal mengenerate report", "Berita Acara penagihan yang anda pilih belum memiliki data pada periode penagihan yang dipilih")
        } else {
            showError(error?.response?.data?.message ?? "Terjadi Kesalahan pada server!");
        }
        console.error(error);
        return error
    }
}

export async function FetcherPost(url, data, settings = {}) {
    try {
        console.log('%c FetcherPost: ' + url, 'background: #222; color: #bada55');
        console.log('%c withParam: ' + JSON.stringify(data), 'background: #222; color: #bada55');
        console.log('%c withSettings: ' + JSON.stringify(settings), 'background: #222; color: #bada55');

        const response = await axios.post(url, data);

        return response
    } catch (error) {
        showError(error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
        console.error(error);
        return {
            code: -1,
            info: error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!",
        }
    }
}

export async function FetcherPut(url, data) {
    try {
        console.log('%c FetcherPut: ' + url, 'background: #222; color: #bada55');
        console.log('%c withParam: ' + JSON.stringify(data), 'background: #222; color: #bada55');

        const response = await axios.put(url, data);

        return response
    } catch (error) {
        showError(error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
        console.error(error);
        return {
            code: -1,
            info: error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!",
        }
    }
}