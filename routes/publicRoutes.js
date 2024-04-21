const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicController');
const auth = require('../auth/auth');

router.get('/login', controller.show_login);
router.post('/login', auth.user_login, controller.handle_login);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);

router.get('/contact', controller.contact_page);
router.post('/contact', controller.submit_message);

router.get('/messages', auth.verifyAdmin, controller.show_messages);
router.post('/messages', auth.verifyAdmin, controller.delete_message);

router.get('/', controller.landing_page);
router.get('/about', controller.about_page);
router.get('/logout', controller.logout);

module.exports = router;