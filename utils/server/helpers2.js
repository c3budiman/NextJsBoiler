import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';
// import Md5 from 'md5'
// import jwt from 'jsonwebtoken';
global.crypto = require('crypto')

var client = null

//this function made cookies, in browser
export function setSession(req, res, input_session, key_session = "nms") {
    if (!isJson(input_session)) {
        return { code: "101", info: "Please Use JSON for Input Format.", data: {} }
    }
    let cookies_data = buildCookiesWithJWT(key_session, input_session, true);
    res.setHeader("Set-Cookie", cookies_data.cookies)
    return {
        code: "0",
        info: "Set Session Berhasil",
        token: cookies_data.token
    }
}

const buildCookiesWithJWT = (key, val, rememberLogin) => {
    var now = new Date();
    var time = now.getTime();

    // 7 day expires cookie if remember login/ if not 1 day
    var token = '';
    if (!rememberLogin) {
        time += ((3600 * 1000) * 24);
        token = jwt.sign({ sess: val }, process.env.APPKEY, { expiresIn: "1 days" });
    } else {
        time += ((3600 * 1000) * 24 * 7);
        token = jwt.sign({ sess: val }, process.env.APPKEY, { expiresIn: "7 days" });
    }

    now.setTime(time);

    // encrypt jwt token :
    token = encryptBro(process.env.APPKEY, token);

    let data = key + "=" + token + ";";
    let expires = "expires=" + now.toUTCString() + ";";
    let path = "path=/" + ";";
    let httpOnly = "httpOnly" + ";";
    let SameSite = "SameSite=Strict" + ";";
    let cookies = data + expires + path + httpOnly + SameSite;

    return {
        "token": token,
        "cookies": cookies,
    }
}

export const getCookie = (key, req) => {
    return process.browser
        ? getCookieFromBrowser(key)
        : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }

    const rawCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};

export const encryptBro = (key, val) => {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(val, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

export const decryptBro = (key, val) => {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var dec = decipher.update(val, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

export function emptyToString(str) {
    return typeof (str) == "undefined" ? "" : str == null ? "" : str
}

export function ApiFormat(code, info, data) {
    return { code: code, info: info, data: data }
}

export function rejectNull(str, label, res, message) {
    if (!message) {
        message = label + " cannot be empty"
    }

    if (typeof (str) == "undefined") {
        res.status(200).json(ApiFormat(500, message, []))
        throw new Error("data is empty");
    } else {
        if (str == null) {
            res.status(200).json(ApiFormat(500, message, []))
            throw new Error("data is empty");
        } else {
            return str
        }
    }
}

export function isJson(item) {
    if (typeof (item) != "undefined") {
        item = typeof item !== "string"
            ? JSON.stringify(item)
            : item;

        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }

        if (typeof item === "object" && item !== null) {
            return true;
        }

        return false
    } else {
        return false;
    }
}

export function funcDateNowMili() {
    var d = new Date();
    let dateNow = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
    return dateNow;
}

export async function getSessionFromHeader(req) {
    try {
        let token = req.headers?.authorization ?? "";
        let getTokenFromHeader = true;

        let tokenfromcookie = getCookie(process.env.APPNAME, req)
        if (token == "") {
            token = tokenfromcookie;
            getTokenFromHeader = false;
        }

        if (token != "") {
            if (token?.length > 7 ?? false) {
                // console.log(token.substring(7))
                let bearer = token;
                if (getTokenFromHeader) {
                    bearer = token.substring(7);
                }

                try {
                    // this is a two decrypter one is for our sha256 and the other is for our jwt.
                    let decrypted = decryptBro(process.env.APPKEY, bearer);
                    let verifiedjwt = await jwt.verify(decrypted, process.env.APPKEY);
                    return {
                        'code': 0,
                        'info': 'ok',
                        'data': JSON.parse(verifiedjwt.sess)
                    };
                } catch (error) {
                    return {
                        'code': 1,
                        'info': 'Please log in to get access.',
                    };
                }
            } else {
                return {
                    'code': 2,
                    'info': 'Please log in to get access.',
                };
            }
        } else {
            return {
                'code': 3,
                'info': 'Please log in to get access.',
            };
        }
    } catch (error) {
        // console.log(error)
        return {
            'code': 4,
            'info': 'Please log in to get access.',
        };
    }

}