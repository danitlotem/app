const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

module.exports = {
  getAllChats: (req, res) => {
    mySqlConnection.query("SELECT * from Chats", (err, rows) => {
      try {
        res.send(rows);
      } 
      catch (err) {
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
        } 
        catch (err) {
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
      `select * from connections where (user_A_id = ${userIdA} and user_B_id = ${userIdB} and connected = 1)`,
      (err, rows) => {
        try {
          if(rows.length > 0)
          {
            mySqlConnection.query(
              "INSERT INTO Chats (create_date, user_A_id, user_B_id) values (?, ?, ?)" +
                "ON DUPLICATE KEY UPDATE user_A_id = ?, user_B_id = ?",
              [currentDate, userIdA, userIdB, userIdA, userIdB],
              (err, rows) => {
                try {
                  res.send(`Chat between users ${userIdA} and ${userIdB} added successfully.`);
                } catch (err) {
                  console.log(err.message);
                }
              }
            )
          }
          else 
          {
            res.send(`Chat not added. There is no mutual connection between users ${userIdA} and ${userIdB}.`);
          }
        } 
        catch (err) {
          console.log(err.message);
        }
      }
    )
  },

  deleteUsersChat: (req, res) => {
    const userIdA = req.params.useridA;
    const userIdB = req.params.useridB;

    mySqlConnection.query(
      "DELETE FROM Chats WHERE user_A_id = ? AND user_B_id = ?",
      [userIdA, userIdB],
      (err, result) => {
        try 
        {
          res.send("chat deleted successfully");
        } 
        catch (err) {
          console.log(err.message);
        }
      }
    );
  },
};
