const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

const formatYmd = (date) => date.toISOString().slice(0, 10);

module.exports = {
  getAllUsers: (req, res) => {
    mySqlConnection.query("SELECT* from users", (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  },
  getOneUser: (req, res) => {
    mySqlConnection.query(
      "SELECT * from users WHERE user_id= ?",
      [req.params.userid],
      (err, rows) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  },
  // createUser: (req,res)=>{
  //     let app_id=12; //need to generate app_id
  //     let facebood_id = req.body.facebood_id;
  //     let phoneNumber=req.body.phoneNumber;
  //     let searchModeId = req.body.searchModeId;
  //     let releationshipId=req.body.releationshipId;
  //     let interestdIn=req.body.interestdIn;
  //     let radius=req.body.radius;
  //     let olderThan18=req.body.olderThan18;
  //     let registerDate=formatYmd(new Date(req.body.registerDate));
  //     let longitude = req.body.longitude;
  //     let latitude=req.body.latitude;

  //     //need to search if email exist

  //     mySqlConnection.query(`INSERT INTO users (app_id, facebook_id, phone_number, search_Mode_id, relationship_id, interesting_in_id, radius, older_then_18, registration_date, longitude, latitude) VALUES ("${app_id}","${facebood_id}","${phoneNumber}","${searchModeId}","${releationshipId}", "${interestdIn}", "${radius}", "${olderThan18}", "${registerDate}","${longitude}","${latitude}")`,(err,result)=> {
  //        if(!err)
  //        {
  //            res.send("user added successfully");
  //        }
  //        else
  //        {
  //            console.log(err);
  //        }
  //     })
  // },
  createUser: (req, res) => {
    let user_id = 10; //need to generate app_id
    let email = req.body.email;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let dateOfBirth = formatYmd(new Date(req.body.dateOfBirth));
    let address = req.body.address;
    let gender = req.body.gender;
    let phoneNumber = req.body.phoneNumber;
    let registerDate = formatYmd(new Date(req.body.registerDate));

    //need to search if email exist

    mySqlConnection.query(
      `INSERT INTO users (user_id, email, first_name, last_name, password, date_of_birth, address, gender, phone_number, registration_date) VALUES ("${user_id}","${email}","${first_name}","${last_name}","${password}", "${dateOfBirth}", "${address}", "${gender}", "${phoneNumber}","${registerDate}")`,
      (err, result) => {
        if (!err) {
          res.send("user added successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  deleteUser: (req, res) => {
    mySqlConnection.query(
      "DELETE FROM users WHERE user_id=?",
      req.params.userid,
      (err, resuls) => {
        if (!err) {
          res.send("user deleted successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  updateUser: (req, res) => {
    let user_id = 10; //need to generate app_id
    let email = req.body.email;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let dateOfBirth = formatYmd(new Date(req.body.dateOfBirth));
    let address = req.body.address;
    let gender = req.body.gender;
    let phoneNumber = req.body.phoneNumber;
    let registerDate = formatYmd(new Date(req.body.registerDate));
    mySqlConnection.query(
      "UPDATE users SET user_id=?, email=?, first_name=?, last_name=?, password=?, dateOfBirth=?, address=?, gender=?," +
       "phone_number=?, registration_date=?  WHERE user_id=?",
      [
        user_id,
        email,
        first_name,
        last_name,
        password,
        dateOfBirth,
        address,
        gender,
        phoneNumber,
        registerDate,
        req.params.userid,
      ],
      (err, result) => {
        if (!err) {
          res.send("user updated successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
};
