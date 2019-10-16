var mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({ 
    host: "localhost",
    user: 'vaibhav',
    password: "tester",
    database:'daalchini'
    // host:'159.65.99.182',
    // user: "ojipfmig_vaibhav",
    // password:'tester@0409',
    // database:'ojipfmig_nojhikjhik'
});

pool.query = util.promisify(pool.query);    //to make it support async await 

module.exports = pool;  //supports both callbacks and async await in database query