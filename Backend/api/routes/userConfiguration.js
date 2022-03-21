const express = require('express');
const router = express.Router();

const {
    getUserConfiguration, 
    createUserConfiguration,
    deleteUserConfiguration,
    updateUserConfiguration,
    updateSearchMode
} = require('../controllers/userConfiguration');

router.get('/:userid',getUserConfiguration); //get user persaonal details by appid (/PersonalDetails/:appid)
router.post('/:userid', createUserConfiguration); //post (/PersonalDetails/)
router.delete('/:userid', deleteUserConfiguration); //delete user persaonal details (/PersonalDetails/:appid)
router.put('/:userid', updateUserConfiguration);
router.put('/searchMode/:userid', updateSearchMode)

module.exports=router;