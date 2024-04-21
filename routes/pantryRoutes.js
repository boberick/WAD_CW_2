const express = require('express');
const router = express.Router();
const controller = require('../controllers/pantryController');
const auth = require('../auth/auth');
const donation = require('../controllers/donationController');

router.get('/login', controller.show_login);
router.post('/login', auth.pantry_login, controller.handle_login);

router.get('/register', auth.verifyAdmin, controller.show_register_page);
router.post('/register', auth.verifyAdmin, controller.post_new_user);

router.get('/pantryAccount', auth.verifyPantry, controller.show_pantry_account);

router.get('/updatePantry', auth.verifyPantry, controller.show_pantry_update);
router.put('/updatePantry', auth.verifyPantry, controller.update_pantry);
router.delete('/updatePantry', auth.verifyPantry, controller.delete_account);

router.get('/pantries', controller.show_pantries);
router.delete('/pantries', auth.verifyAdmin, controller.delete_pantry);

router.get('/:id', auth.verifyAdmin, donation.show_pantry_claimed);

module.exports = router;