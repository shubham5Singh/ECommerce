const sql = require('mssql');
const uuidv4 = require('uuid/v4');
const config = require('../../sqlconfig');

exports.logIn = function (req, response) {
    const credential = {
        email: req.body.email,
        password: req.body.password
    };
    sql.connect(config).then(() => {
        return sql.query`select * from Admin where Email = ${credential.email} and Password =${credential.password}`;
    }).then(result => {
        sql.close();
        if (result.rowsAffected > 0) {
            response(null, result.recordset[0].Status);
        }
        else {
            response(null, null);
        }
    }).catch(err => {
        sql.close();
        response(err, null);
    });

    sql.on('error', err => {
        sql.close();
        response(err, null);
    });
}

exports.updatePassword = function (email,password, response) {
    sql.connect(config).then(() => {
        return sql.query`UPDATE Admin SET Password = ${password} WHERE Email =${email}`;
    }).then(result => {
        sql.close();
        if (result.rowsAffected > 0) {
            response(null, 1);
        }
        else {
            response(null, null);
        }
    }).catch(err => {
        sql.close();
        response(err, null);
    });
}