const express = require('express');
const router = express.Router();

const {
    getUserHobbies, 
    createUserHobbies,
    deleteUserHobbies,
    updateUserHobbies
} = require('../controllers/hobbies');

router.get('/:userid',getUserHobbies); //get user by appid (/hobbies/:userid)
router.post('/:userid', createUserHobbies); //post (/hobbies/)
router.delete('/:userid', deleteUserHobbies) //delete user (/hobbies/:userid)
router.put('/:userid', updateUserHobbies); //update user

module.exports=router;
