import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

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
            // you can log error or anything here...
            // you can enable it inside next.config.
            // but please note, it wont work on serverless, you need db to store error logs.
            // if you want it to work on serverless.
            if (response.data.code != 0 && publicRuntimeConfig.EnableLogging) {
                axios.post('/api/log/insertlog', {
                    url: url,
                    input: data,
                    output: response.data,
                });
            }

            return response.data;
        } else {
            // you can log error or anything here...
            if (publicRuntimeConfig.EnableLogging) {
                axios.post('/api/log/insertlog', {
                    url: url,
                    input: data,
                    output: response.data,
                });
            }

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