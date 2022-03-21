//const mysql=require("mysql");
const dbConfig = require('../../config/db_config');
const mySqlConnection = dbConfig;

const formatYmd = date => date.toISOString().slice(0, 10);

module.exports={
    getUserConfiguration: (req,res) => {
        const arr = (req.params.userid).split(",");
        mySqlConnection.query("SELECT * from user_configuration WHERE user_id IN (?)",[arr], (err,rows)=>{
            if(!err)
            {
                if(rows.length>0)
                {
                    for(let i=0; i<rows.length; i++)
                    {
                        var dob = rows[i].date_of_birth;
                        var diff_ms = Date.now() - dob;
                        var age_dt = new Date(diff_ms); 
                        var age= Math.abs(age_dt.getUTCFullYear() - 1970);
                        rows[i].age = age;
                    }
                }
                
                res.send(rows);
            }
            else
            {
                console.log(err);
            }
        })
    },
    createUserConfiguration: (req,res)=>{

        let user_id=req.params.userid;
        let first_name=req.body.first_name;
        let last_name = req.body.last_name;
        let dateOfBirth=formatYmd(new Date(req.body.date_of_birth));
        let city=req.body.city;
        let gender=req.body.gender;
        let phoneNumber = req.body.phone_number;
        let registerDate=formatYmd(new Date());
        let relationship_status = req.body.relationship_status;
        let search_mode = req.body.search_mode;
        let sexual_orientation = req.body.sexual_orientation;
        let profession = req.body.profession;
        let pronoun = req.body.pronoun;
        let interested_in = req.body.interested_in;
        let hobbies = req.body.hobbies
        let radius = req.body.radius;
        let longitude = req.body.longitude;
        let latitude = req.body.latitude;

        mySqlConnection.query(`INSERT INTO user_configuration (user_id, first_name, last_name, date_of_birth, city, gender, phone_number, registration_date, relationship_status, search_mode, sexual_orientation, profession, pronoun, interested_in, hobbies, radius, longitude, latitude) VALUES ("${user_id}","${first_name}","${last_name}","${dateOfBirth}","${city}","${gender}","${phoneNumber}","${registerDate}","${relationship_status}","${search_mode}","${sexual_orientation}","${profession}","${pronoun}","${interested_in}", "${hobbies}" ,"${radius}","${longitude}","${latitude}")`,(err,result)=> {
           if(!err)
           {
               res.send("user configuration of user added successfully");
           }
           else
           {
               console.log(err);
           }
        })
    
    },
    deleteUserConfiguration: (req,res) => {
        mySqlConnection.query("DELETE FROM user_configuration WHERE user_id=?",req.params.userid, (err,resuls)=>{
            if(!err)
            {
               res.send("user configuration deleted successfully");
            }
            else
            {
                console.log(err);
            }
        })
    },
    updateUserConfiguration: (req,res) => {
        let user_id=req.params.userid;
        let first_name=req.body.first_name;
        let last_name = req.body.last_name;
        let dateOfBirth=formatYmd(new Date(req.body.dateOfBirth));
        let city=req.body.city;
        let gender=req.body.gender;
        let phoneNumber = req.body.phoneNumber;
        let registerDate=formatYmd(new Date());
        let relationship_status = req.body.relationship_status;
        let search_mode = req.body.search_mode;
        let sexual_orientation = req.body.sexual_orientation;
        let profession = req.body.profession;
        let pronoun = req.body.pronoun;
        let interested_in = req.body.interested_in;
        let hobbies = req.body.hobbies
        let radius = req.body.radius;
        let longitude = req.body.longitude;
        let latitude = req.body.latitude;

        mySqlConnection.query("UPDATE user_configuration SET first_name=?, last_name=?, password=?, dateOfBirth=?, city=?, gender=?, phone_number=?, registration_date=?, relationship_status=?, search_mode=?, sexual_orientation=?, profession=?, pronoun=?, interested_in=?, hobbies=? ,radius=?, longitude=?, latitude=? WHERE user_id=?", [first_name, last_name,  dateOfBirth, city, gender, phonenumber, registration_date, relationship_status,search_mode,sexual_orientation,profession,pronoun,interested_in, hobbies ,radius,longitude,latitude,req.params.user_id], (err,result)=> {
            if(!err)
            {
               res.send("user configuration updated successfully");
            }
            else
            {
                console.log(err);
            }
        }) 
    }
}
