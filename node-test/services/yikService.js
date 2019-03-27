const sql = require("mssql");
const { poolPromise } = require("../db");

// const config =
//   "Data Source=LAPTOP-HCI746K2\\SQLEXPRESS;Initial Catalog=PersonalProject;User ID=Michael;Password=m6201994m";

const insertYik = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Title", sql.NVarChar(100), data.title)
          .input("Content", sql.NVarChar(250), data.content)
          .output("Id", sql.Int)
          .execute("dbo.Insert_Posts", (err, something) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(something.output);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const insertComment = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Content", sql.NVarChar(250), data.content)
          .input("PostId", sql.Int, parseInt(data.id))
          .output("Id", sql.Int)
          .execute("dbo.Insert_Comment", (err, response) => {
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

const selectAllYik = () => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool.request().execute("dbo.Select_Posts", (err, posts) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(posts);
        });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const selectById = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Id", sql.Int, parseInt(data))
          .execute("dbo.SelectById_Posts", (err, posts) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(posts);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const selectByPostId = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("PostId", sql.Int, parseInt(data))
          .execute("dbo.SelectByPostId_Comment", (err, posts) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(posts);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const deleteYik = id => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Delete_Posts");
      })
      .then(result => {
        resolve(result), sql.close;
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteComment = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Id", sql.Int, parseInt(data))
          .execute("dbo.Delete_Comment");
      })
      .then(result => {
        resolve(result), sql.close;
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateLikes = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Id", sql.Int, data.postId)
          .input("NumberOfLikes", sql.Int, data.postNumberOfLikes)
          .execute("dbo.Update_Posts");
      })
      .then(result => {
        resolve(result), sql.close;
      })
      .catch(err => {
        reject(err), sql.close;
      });
  });
};

const updateCommentLikes = data => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Id", sql.Int, data.commentId)
          .input("NumberOfLikes", sql.Int, data.commentNumberOfLikes)
          .execuse("dbo.Update_Comment");
      })
      .then(result => {
        resolve(result), sql.close;
      })
      .catch(err => {
        reject(err), sql.close;
      });
  });
};

module.exports = {
  insertYik,
  selectAllYik,
  deleteYik,
  deleteComment,
  updateLikes,
  updateCommentLikes,
  selectById,
  insertComment,
  selectByPostId
};
