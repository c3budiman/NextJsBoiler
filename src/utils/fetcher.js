import axios from 'axios';

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
            if (response.data.code != 0) {
                // you can log error or anything here...
                await axios.post('/api/log/insertlog', {
                    url: url,
                    input: data,
                    output: response.data,
                });
            }

            return response.data;
        } else {
            // you can log error or anything here...
            await axios.post('/api/log/insertlog', {
                url: url,
                input: data,
                output: response.data,
            });

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