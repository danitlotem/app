//const mysql=require("mysql");
const dbConfig = require("../../config/db_config");
//const users = require("./users");
const mySqlConnection = dbConfig;

module.exports = {
  getAllChats: (req, res) => {
    mySqlConnection.query("SELECT * from Chats", (err, rows) => {
      try {
        res.send(rows);
      } catch (err) {
        console.log(err.message);
      }
    });
  },

  getUsersChat: (req, res) => {
    const userIdA = req.params.useridA;
    const userIdB = req.params.useridB;
    mySqlConnection.query(
      "SELECT * FROM Chats WHERE user_A_id = ? AND user_B_id = ?",
      [userIdA, userIdB],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  createUsersChat: (req, res) => {
    const currentDate = new Date();
    const userIdA = req.params.useridA;
    const userIdB = req.params.useridB;

    mySqlConnection.query(
      "INSERT INTO Chats (create_date, user_A_id, user_B_id) values (?, ?, ?)" +
        "ON DUPLICATE KEY UPDATE user_A_id = ?, user_B_id = ?",
      [currentDate, userIdA, userIdB, userIdA, userIdB],
      (err, result) => {
        try {
          res.send("chat added successfully");
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  deleteUsersChat: (req, res) => {
    const userIdA = req.params.useridA;
    const userIdB = req.params.useridB;

    mySqlConnection.query(
      "DELETE FROM Chats WHERE user_A_id = ? AND user_B_id = ?",
      [userIdA, userIdB],
      (err, result) => {
        try {
          res.send("chat deleted successfully");
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },
};
