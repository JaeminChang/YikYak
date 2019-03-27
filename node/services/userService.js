const { poolPromise } = require("../db");
const sql = require("mssql");

const insertUser = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("UserName", sql.NVARCHAR(50), data.userName)
          .input("Password", sql.NVARCHAR(50), data.password)
          .output("Id", sql.Int)
          .execute("dbo.Insert_User", (err, response) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(response.output);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const selectUser = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("UserName", sql.NVARCHAR(50), data.userName)
          .input("Password", sql.NVARCHAR(50), data.password)
          .execute("dbo.Select_User", (err, response) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(response);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const updatePassword = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("UserName", sql.NVARCHAR(50), data.userName)
          .input("Password", sql.NVARCHAR(50), data.password)
          .execute("dbo.Update_Password", (err, response) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(response);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = { insertUser, selectUser, updatePassword };
