const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const donate_controller = require('../controllers/donationController');
const auth = require('../auth/auth');

router.get('/userAccount', auth.verifyUser, controller.show_user_account);

router.get('/updateUser', auth.verifyUser, controller.show_user_update);
router.put('/updateUser', auth.verifyUser, controller.update_user);
router.delete('/updateUser', auth.verifyUser, controller.delete_account);

router.get('/users', auth.verifyAdmin, controller.show_users);
router.post('/users', auth.verifyAdmin, controller.delete_user);

router.get('/:authorId', auth.verify, donate_controller.show_user_donations);
router.post('/:authorId', auth.verify, donate_controller.delete_donation);

module.exports = router;