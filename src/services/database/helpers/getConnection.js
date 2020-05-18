const getConnection = async(pool) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => err ? reject(err) : resolve(connection))
  })
}

module.exports = getConnection