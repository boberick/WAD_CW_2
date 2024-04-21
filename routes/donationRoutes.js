const express = require('express');
const router = express.Router();
const controller = require('../controllers/donationController');
const auth = require('../auth/auth');

router.get('/all', auth.verifyPantry, controller.show_all_donations);
router.post('/all', auth.verifyPantry, controller.make_claim);
router.post('/delete', auth.verifyAdmin, controller.delete_donation);

router.get('/donate', auth.verify, controller.make_donation);
router.post('/donate', auth.verify, controller.create_donation);

router.get('/claimedDonations', auth.verifyPantry, controller.show_all_claimed);

router.get('/:id', auth.verify, controller.display_donation);
router.delete('/:id', auth.verifyPantry, controller.delete_donation);

router.get('/:id/update', auth.verify, controller.donation_update);
router.put('/:id/update', auth.verify, controller.update_donation);

module.exports = router;