const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const auth = require('../auth/auth');

router.get('/adminAccount', auth.verifyAdmin, controller.show_admin_account);

router.get('/login', controller.show_login);
router.post('/login', auth.admin_login, controller.handle_login);

router.get('/register', auth.verifyAdmin, controller.show_register_page);
router.post('/register', auth.verifyAdmin, controller.post_new_user);

router.get('/admins', auth.verifyAdmin, controller.show_admins);
router.delete('/admins', auth.verifyAdmin, controller.delete_admin);

router.get('/updateAdmin', auth.verifyAdmin, controller.show_admin_update);
router.put('/updateAdmin', auth.verifyAdmin, controller.update_admin);
router.delete('/updateAdmin', auth.verifyAdmin, controller.delete_account);

module.exports = router;