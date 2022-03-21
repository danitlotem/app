const dbConfig = require('../../config/db_config');
const mySqlConnection = dbConfig;

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'images/')

    },
    filename: (req, file, cb) =>
    {
        cb(null, Date.now()+file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb)=>
    {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));

        if(mimeType && extName)
        {
            return cb(null, true);
        }

        cb("upload only jpeg/jpg/png");
    }
}).single('image');

module.exports={
    upload,

    storeUserPic: (req,res) => {
        let user_id= req.params.userid;
        image = req.file.path;
        main_image = req.body.main_image;

        mySqlConnection.query(`INSERT INTO user_pictures (user_id, image, main_image) VALUES ("${user_id}","${image}","${main_image}")`,(err,result)=> {
            if(!err)
            {
                res.send("picture of user added successfully");
            }
            else
            {
                console.log(err);
            }
         })

    },

    getUserPictures: (req,res) => {
        mySqlConnection.query("SELECT* from user_pictures WHERE user_id=?",[req.params.userid], (err,rows)=>{
            if(!err)
            {
                res.send(rows);
            }
            else
            {
                console.log(err);
            }
        })
    },

    getUserMainPicture: (req, res) =>
    {
        mySqlConnection.query("SELECT* from user_pictures WHERE user_id=? AND main_image='1'", [req.params.userid], (err,rows) =>
        {
            if(!err)
            {
                res.send(rows);
            }
            else
            {
                console.log(err);
            }
        })
    },
    
    deleteUserPicture: (req,res) => {
        mySqlConnection.query("DELETE FROM user_pictures WHERE user_id=? AND image=?",[req.params.userid,req.body.image], (err,resuls)=>{
            if(!err)
            {
               res.send("picture deleted successfully");
            }
            else
            {
                console.log(err);
            }
        })
    },

    updateUserPicture: (req,res)=> {
        mySqlConnection.query("UPDATE user_pictures SET image=?, main_image=? WHERE user_id=?", [req.body.image,req.body.main_image,req.params.userid], (err,result)=> {
            if (!err)
            {
                res.send("picture updated successfully");
            }
            else
            {
                console.log(err)
            }
        })
    }
}
