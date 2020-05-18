const mysql = require('mysql');
const getConnection = require('./helpers/getConnection');
const queryDb = require('./helpers/queryDb');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host     : '0.0.0.0',
  user     : 'root',
  password : 'root',
  database : 'selfcare'
});

const getUserByEmail = async (email) => {
  const connection = await getConnection(pool);
  const user_account = await queryDb(connection, 'SELECT * FROM `user_account` WHERE `email` = ?', email);
  connection.release();
  return user_account;
}

module.exports = {
  getUserByEmail: getUserByEmail
}