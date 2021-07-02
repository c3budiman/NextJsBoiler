import jwt from 'jsonwebtoken';
import { getCookie } from '../drivers/redis/session';

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
    let token = req.headers?.authorization ?? "";
    let getTokenFromHeader = true;

    let tokenfromcookie = getCookie(process.env.APPNAME, req)
    if (token == "") {
        token = tokenfromcookie;
        getTokenFromHeader = false;
    }

    if (token != "") {
        if (token.length > 7) {
            // console.log(token.substring(7))
            let bearer = token;
            if(getTokenFromHeader) {
                bearer = token.substring(7);
            }
            
            try {
                let verifiedjwt = await jwt.verify(bearer, process.env.APPKEY);
                return {
                    'code': 0,
                    'info': 'ok',
                    'data': {
                        'id': JSON.parse(verifiedjwt.sess).id,
                        'username': JSON.parse(verifiedjwt.sess).username
                    }
                };
            } catch (error) {
                return {
                    'code': 1,
                    'info': 'error parsing jwt',
                };
            }
        } else {
            return {
                'code': 2,
                'info': 'error jwt < 7',
            };
        }
    } else {
        return {
            'code': 3,
            'info': 'error no jwt',
        };
    }
}



