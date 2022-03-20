const { query } = require("express");
const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

module.exports = {
  getAllFilters: (req, res) => {
    mySqlConnection.query("SELECT * FROM Filters", (err, rows) => {
      try {
        res.send(rows);
      } catch (err) {
        console.log(err.message);
      }
    });
  },

  getUserFilter: (req, res) => {
    const userid = req.params.userid;

    mySqlConnection.query(
      "SELECT * FROM Filters WHERE user_id = ?",
      [userid],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getUsersWithCommonHobbiesFilter: (req, res) => {
    const hobbiesFilter = req.body.hobbies_filter;
    const splitHobbiesFilter = hobbiesFilter.replace(/,/g, '%');

    mySqlConnection.query(
      `select * from Filters where hobbies_filter like '%${splitHobbiesFilter}%'`,
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getUsersWithCommonGenderFilter: (req, res) => {
    const genderFilter = req.body.gender_filter;
    const splitGenderFilter = genderFilter.replace(/,/g, '%');
    let queryStr; 
    if(genderFilter === 'men')
    {
        queryStr = `SELECT * FROM Filters WHERE gender_filter like '%${splitGenderFilter}%' and gender_filter not like 'women'`;
    }
    else
    {
        queryStr = `SELECT * FROM Filters WHERE gender_filter like '%${splitGenderFilter}%'`;
    }

    mySqlConnection.query(queryStr,
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getUsersWithCommonRelationshipFilter: (req, res) => {
    const relationshipFilter = req.body.relationship_filter;

    mySqlConnection.query(
      "SELECT * FROM Filters WHERE relationship_filter = ?",
      [relationshipFilter],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getUsersWithCommonInterestingInFilter: (req, res) => {
    const interestingInFilter = req.body.interesting_in_filter;
    const splitInterestingInFilter = interestingInFilter.replace(/,/g, '%');

    mySqlConnection.query(
      `SELECT * FROM Filters WHERE interesting_in_filter like '%${splitInterestingInFilter}%'`,
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getUsersWithCommonAgeFilter: (req, res) => {
    const ageFilter = req.body.age_filter;

    mySqlConnection.query(
      "SELECT * FROM Filters WHERE age_filter = ?",
      [ageFilter],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  createUserFilter: (req, res) => {
    const userid = req.params.userid;
    const hobbiesFilter = req.body.hobbies_filter;
    const genderFilter = req.body.gender_filter;
    const relationshipFilter = req.body.relationship_filter;
    const interestingInFilter = req.body.interesting_in_filter;
    const ageFilter = req.body.age_filter;

    mySqlConnection.query(
      "INSERT INTO Filters (user_id, hobbies_filter, gender_filter, relationship_filter, interesting_in_filter, age_filter)" +
        " values (?, ?, ?, ?, ?, ?)" +
        "ON DUPLICATE KEY UPDATE user_id = ?",
      [
        userid,
        hobbiesFilter,
        genderFilter,
        relationshipFilter,
        interestingInFilter,
        ageFilter,
        userid,
        hobbiesFilter,
        genderFilter,
        relationshipFilter,
        interestingInFilter,
        ageFilter,
      ],
      (err, rows) => {
        try {
            mySqlConnection.query(
              `select first_name from user_configuration where user_id = ${userid}`,
              (err, rows) => {
                try {
                  const userName = rows[0].first_name;
                  msgToClient = {msg: `${userName}'s filters are now updated!`};
                  return res.send(msgToClient);
                } 
                catch (err) {
                  console.log(err.message);
                }
              }
            )
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  updateUserGenderFilter: (req, res) => {
    const genderFilter = req.body.gender_filter;
    const userid = req.params.userid;

    mySqlConnection.query(
      "UPDATE Filters SET gender_filter = ? WHERE user_id = ?",
      [genderFilter, userid],
      (err, result) => {
        try {
          res.send(
            `User number ${userid} updated gender filter to ${genderFilter} successfully`
          );
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  updateUserRelationshipFilter: (req, res) => {
    const relationshipFilter = req.body.relationship_filter;
    const userid = req.params.userid;

    mySqlConnection.query(
      "UPDATE Filters SET relationship_filter = ? WHERE user_id = ?",
      [relationshipFilter, userid],
      (err, result) => {
        try {
          res.send(
            `User number ${userid} updated relationship filter to ${relationshipFilter} successfully`
          );
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  updateUserInterestingInFilter: (req, res) => {
    const interestingInFilter = req.body.interesting_in_filter;
    const userid = req.params.userid;

    mySqlConnection.query(
      "UPDATE Filters SET interesting_in_filter = ? WHERE user_id = ?",
      [interestingInFilter, userid],
      (err, result) => {
        try {
          res.send(
            `User number ${userid} updated interesting in filter to ${interestingInFilter} successfully`
          );
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  updateUserAgeFilter: (req, res) => {
    const ageFilter = req.body.age_filter;
    const userid = req.params.userid;

    mySqlConnection.query(
      "UPDATE Filters SET age_filter = ? WHERE user_id = ?",
      [ageFilter, userid],
      (err, result) => {
        try {
          res.send(
            `User number ${userid} updated age filter to ${ageFilter} successfully`
          );
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  deleteUserFilter: (req, res) => {
    const userid = req.params.userid;

    mySqlConnection.query(
      "delete from Filters where user_id = ?",
      [userid],
      (err, result) => {
        try {
          res.send("filter deleted successfully");
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },
};
