import { funcDateNowMili, isJson, encryptBro, getCookie } from '../../utils/helpers';
import Md5 from 'md5'
import redis from 'redis';

import jwt from 'jsonwebtoken';
global.crypto = require('crypto')


var client = null

//this function made cookies, in browser
//also store it on redis if useRedis = true;
export function setSession(req, res, input_session, key_session = "c3budiman-session", useRedis = false) {
    let random = Md5((Math.random() * 99999) + (Math.random() * 99999) + (Math.random() * 99999) + funcDateNowMili() + (Math.random() * 99999) + (Math.random() * 99999) + (Math.random() * 99999)).toString()
    if (!useRedis) {
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
    } else {
        // bebas sih mau pake redis apa engga.
        //kan dah ada jwt harusnya ga perlu lagi =.=
        //tapi klo emg disuruh pake server kek org bego sih silahkan pake fungsi bego ini :
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
                let cookies_data = buildCookiesWithJWT(key_session, input_session, true);
                res.setHeader("Set-Cookie", cookies_data.cookies)

                // input the session to redis
                return resolve(new Promise(function (resolve_save) {
                    client.setex(random, parseInt((+new Date) / 1000) + 86400, input_session, function (err) {
                        if (err == null) {
                            client.quit()
                            resolve_save({ code: "0", info: "SETEX SUCCEED", token: cookies_data.token })
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
            console.log(error)
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
                            resolve_del({ code: "0", info: "Deleted Succesfully", data: dewa })
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


