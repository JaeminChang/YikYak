const sql = require("mssql");
const config =
  "Data Source=LAPTOP-HCI746K2\\SQLEXPRESS;Initial Catalog=PersonalProject;User ID=Michael;Password=m6201994m";

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log(pool);
    return pool;
  })
  .catch(
    err => console.log("Database Connection Failed! Bad Config: ", err),
    sql.close()
  );

module.exports = {
  sql,
  poolPromise
};
