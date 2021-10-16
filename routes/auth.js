
/**
 * Path: '/api/login
 */
const  {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validateInputs } = require('../middlewares/validate-inputs');


const router = Router();

router.post('/',[
    check('password', 'the password is required').notEmpty(),
    check('email', 'the email is required').isEmail(),
    validateInputs,
],login)

module.exports = router