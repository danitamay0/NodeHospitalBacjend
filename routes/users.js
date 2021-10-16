/**
 * Route Path: /api/users'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');

const { getUsuers, storeUsuer, updateUsuer, deleteUser } = require('../controllers/userController');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [
  validateJWT
], getUsuers)

router.put('/:id', [
  validateJWT,
  check('name', 'the name is required').notEmpty(),
  check('role', 'the password is required').notEmpty(),
  check('email', 'the email is not valid').isEmail(),
], updateUsuer)

router.post('/', [
  check('name', 'the name is required').notEmpty(),
  check('password', 'the password is required').notEmpty(),
  check('email', 'the email is not valid').isEmail(),
  validateInputs

], storeUsuer)

router.delete('/:id', [
  validateJWT,
], deleteUser)


module.exports = router