var mysql = require('mysql');

export async function mysqlQuery(query, param) {
    function doQuery(con, query, param) {
        return new Promise(function (resolve) {
            try {
                console.log(con.state)
                var sql = query
                var inserts = param
                sql = mysql.format(sql, inserts)

                con.query(sql, function (err, result) {
                    if (err) {
                        con.end();
                        resolve({ code: 500, info: "MYSQL Connection Error QUERY", data: { err } })
                    }
                    else {
                        if (sql.substring(0, 6).toUpperCase() == "INSERT") {
                            resolve({ code: 0, info: 'sukses', data: result })
                        } else if (sql.substring(0, 6).toUpperCase() == "UPDATE") {
                            resolve({ code: 0, info: 'sukses', data: result })
                        } else if (sql.substring(0, 6).toUpperCase() == "DELETE") {
                            resolve({ code: 0, info: 'sukses', data: result })
                        } else {
                            // return not found if the select query doesnt get any data.
                            if (result.length > 0) {
                                resolve({ code: 0, info: 'sukses', data: result })
                            }
                            else {
                                resolve({ code: 404, info: "data not found", data: result })
                            }
                        }
                    }
                });
            } catch (error) {
                console.log(error);
                return { code: 500, info: "MYSQL Connection Error", data: { error } }
            }
        });
    }

    try {
        return new Promise(function (resolve) {
            let cached = global.mysql
            if (!cached) cached = global.mysql = {}

            var con;
            if (cached.conmysql && cached.conmysql.state == "authenticated") {
                console.log('already have mysql client');
                con = cached.conmysql
                resolve(doQuery(con, query, param));
            } else {
                console.log('creating mysql client');
                var client = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_DATABASE
                });

                cached.conmysql = client;
                resolve(doQuery(client, query, param));
            }
        })
    } catch (error) {
        console.log(error);
        return { code: 500, info: "MYSQL Connection Error", data: { error } }
    }
}
