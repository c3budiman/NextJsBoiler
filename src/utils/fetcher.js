import axios from 'axios';
// import getConfig from 'next/config'
import { notification } from 'antd';
// const { publicRuntimeConfig } = getConfig()

export function showError(msg) {
    notification["error"]({
        message: 'Galat!',
        description: msg
    });
}

export async function FetcherGet(url, { params, headers } = {}) {
    try {
        console.log('%c FetcherGet: ' + url, 'background: #222; color: #bada55');
        console.log('%c withParam: ' + JSON.stringify(params), 'background: #222; color: #bada55');

        const response = await axios.get(url, { params, headers });

        return response
    } catch (error) {
        showError(error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
        console.error(error);
        return {
            code: -1,
            info: error?.response?.data?.info ?? "Terjadi Kesalahan pada server!",
        }
    }
}

export async function FetcherPost(url, data, settings = {}) {
    try {
        console.log('%c FetcherPost: ' + url, 'background: #222; color: #bada55');
        console.log('%c withParam: ' + JSON.stringify(data), 'background: #222; color: #bada55');
        console.log('%c withSettings: ' + JSON.stringify(settings), 'background: #222; color: #bada55');

        const response = await axios.post(url, data, {
            // 10 min
            timeout: settings?.timeout ?? 10000,
        });

        return response
    } catch (error) {
        showError(error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
        console.error(error);
        // for logging, if you want to enable, but this is still not good
        // if (publicRuntimeConfig.EnableLogging) {
        //     axios.post('/api/log/insertlog', {
        //         url: url,
        //         input: data,
        //         output: error?.data,
        //     });
        // }
        return {
            code: -1,
            info: error?.response?.data?.info ?? "Terjadi Kesalahan pada server!",
        }
    }
}