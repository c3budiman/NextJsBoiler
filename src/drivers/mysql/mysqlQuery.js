export function mysqlQuery(query, param) {

    var mysql = require('mysql');

    return new Promise(function (resolve) {
        var con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });

        con.connect(function (err) {
            if (err) {
                resolve({ code: 500, info: "MYSQL Connection Error.", data: { err } })
            }
            else {
                var sql = query
                var inserts = param
                sql = mysql.format(sql, inserts)

                con.query(sql, function (err, result, fields) {
                    if (err) {
                        resolve({ code: 500, info: "MYSQL Connection Error QUERY", data: { err } })
                        con.end();
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
                        con.end();
                    }
                });
            }
        });
    })


}
