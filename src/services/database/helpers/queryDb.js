const { ErrorHandler } = require('../../../errors')

const queryDb = (connection, statement, ...options) => {
  return new Promise((resolve, reject) => {
    connection.query(statement, [options], (err, results) => err ? reject(new ErrorHandler(500, err)) : resolve(results))
  })
}

module.exports = queryDb;