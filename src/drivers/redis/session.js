import { funcDateNowMili, isJson } from '../../utils/helpers';

import cookie from 'js-cookie';
import Md5 from 'md5'
import redis from 'redis';

import jwt from 'jsonwebtoken';

var client = null

//this function made cookies, in browser
//and also store it on redis.
export function setSession(req, res, input_session, key_session = "c3budima-session") {
    let random = Md5((Math.random() * 99999) + (Math.random() * 99999) + (Math.random() * 99999) + funcDateNowMili() + (Math.random() * 99999) + (Math.random() * 99999) + (Math.random() * 99999)).toString()

    return new Promise(function (resolve) {

        if (!isJson(input_session)) {
            resolve({ code: "101", info: "Please Use JSON for Input Format.", data: {} })
        }

        //make redis retry on fail :
        client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_IP, {
            retry_strategy: function (options) {
                if (options.error && options.error.code === "ECONNREFUSED") {
                    //port is not open bro!
                    return new Error("The server refused the connection");
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    return new Error("Retry time exhausted");
                }
                if (options.attempt > 10) {
                    return undefined;
                }
                return Math.min(options.attempt * 100, 3000);
            },
        });

        client.auth(process.env.REDIS_PASSWORD);

        client.on("error", function (error) {
            client.quit()
            console.log(error)
            resolve({ code: "-1", info: "REDIS Connection Error." })
        });

        client.on("ready", function () {
            // RANDOM KEY-NYA
            let cookies_data = [
                buildCookiesWithJWT(key_session, input_session, true)
            ];
            res.setHeader("Set-Cookie", cookies_data)

            // input the session to redis
            return resolve(new Promise(function (resolve_save) {
                client.setex(random, parseInt((+new Date) / 1000) + 86400, input_session, function (err, reply) {
                    if (err == null) {
                        client.quit()
                        resolve_save({ code: "0", info: "SETEX SUCCEED", data: {} })
                    }
                    else {
                        client.quit()
                        resolve_save({ code: "-1", info: "Redis Connection Error SETEX" })
                        let error = JSON.stringify({
                            code: 3,
                            info: "Cant Setex, Redis",
                            data: err
                        })
                        console.log(error)
                        throw new Error(error);
                    }
                });
            }))
        });
    })
}

export function delSession(req) {
    return new Promise(function (resolve) {
        let appskey = getCookie(process.env.APPNAME, req)
        if (appskey == undefined) {
            return resolve({ code: "403", info: "Session Tidak Ditemukan", data: {} })
        }

        client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_IP, {
            retry_strategy: function (options) {
                if (options.error && options.error.code === "ECONNREFUSED") {
                    //port is not open bro!
                    return new Error("The server refused the connection");
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    //lebih dari 1 jam anjay
                    return new Error("Retry time exhausted");
                }
                if (options.attempt > 10) {
                    //error nya lebih dari 10
                    return undefined;
                }
                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            },
        });

        client.auth(process.env.REDIS_PASSWORD);

        // client.auth(process.env.IP_REDIS.auth);
        client.on("error", function (error) {
            resolve({ code: "-1", info: "REDIS Connection Error." })
        });

        client.on("ready", function () {
            return resolve(new Promise(function (resolve_del) {
                client.del(appskey, function (err, replies) {
                    if (err == null) {
                        if (replies == null) {
                            resolve_del({ code: "403", info: "Session Tidak Ditemukan", data: {} })
                        }
                        else {
                            var dewa = JSON.parse(replies)
                            resolve_del({ code: "0", info: "Deleted Succesfully" })
                            client.quit()
                        }
                    }
                    else {
                        resolve_del({ code: "-1", info: "Redis Connection Error GET KEYS" })
                    }
                });
            }))
        });
    })
}


const buildCookies = (key, val, rememberLogin) => {
    var now = new Date();
    var time = now.getTime();
    // 1 day expires cookie
    time += ((3600 * 1000) * 24);
    now.setTime(time);

    let data = key + "=" + val + ";";
    let expires = "expires=" + now.toUTCString() + ";";
    let path = "path=/" + ";";
    let httpOnly = "httpOnly" + ";";
    let SameSite = "SameSite=Strict" + ";";


    return data + expires + path + httpOnly + SameSite
}


const buildCookiesWithJWT = (key, val, rememberLogin) => {
    var now = new Date();
    var time = now.getTime();
    // 7 day expires cookie if remember login/ if not 1 day
    if (!rememberLogin) {
        time += ((3600 * 1000) * 24);
    } else {
        time += ((3600 * 1000) * 24 * 7);
    }

    now.setTime(time);
    var token = jwt.sign({ sess: val }, process.env.APPKEY);

    let data = key + "=" + token + ";";
    let expires = "expires=" + now.toUTCString() + ";";
    let path = "path=/" + ";";
    let httpOnly = "httpOnly" + ";";
    let SameSite = "SameSite=Strict" + ";";

    return data + expires + path + httpOnly + SameSite
}

const getCookie = (key, req) => {
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
