const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//view edit delete
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/adduser',userController.form);
router.post('/adduser',userController.create);
router.get('/edituser/:Week_Number',userController.edit);
router.post('/edituser/:Week_Number',userController.update);
router.get('/ops',userController.table1);
router.post('/ops',userController.find2);
router.get('/adduser2',userController.form2);
router.post('/adduser2',userController.create2);
router.get('/edituser2/:Week_Number',userController.edit2);
router.post('/edituser2/:Week_Number',userController.update2); 
router.get('/B2B',userController.table2);
router.post('/B2B',userController.find3);
router.get('/adduser3',userController.form3);
router.post('/adduser3',userController.create3);
router.get('/:Week_Number',userController.delete);
router.get('/ops/:Week_Number',userController.delete2);
router.get('/B2B/:Week_Number',userController.delete3);






module.exports = router;