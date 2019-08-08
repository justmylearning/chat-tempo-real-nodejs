var mysql = require('mysql');

module.exports = class DatabaseFactory{
    static getConnection(){

        if(DatabaseFactory.conn)
            return DatabaseFactory.conn;

        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: 'test'
        });

        DatabaseFactory.con = conn;
        return conn;
    }
}