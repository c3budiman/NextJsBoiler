const fs = require('fs');
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

var apiErrorStream = fs.createWriteStream(path.join(serverRuntimeConfig.PROJECT_ROOT, './logs/error.txt'), {
    flags: 'a'
});

export function LoggerApiError(endpoint, input, output) {
    try {
        var message = "\n" + new Date().toISOString() + " : " + endpoint + "\n";
        message += "Input: " + JSON.stringify(input) + "\n";
        message += "Output: " + JSON.stringify(output) + "\n";
        apiErrorStream.write(message);
        return true
    } catch (error) {
        return false
    }

}