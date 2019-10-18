var mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: "localhost",
    user: 'vaibhav',
    password: "tester",
    database:'daalchini'
});

pool.query = util.promisify(pool.query);    //to make it support async await 

module.exports = pool;  //supports both callbacks and async await in database query
