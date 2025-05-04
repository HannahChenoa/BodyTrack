const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/register', (req, res, next) => {
    console.log("📥 Se recibió una petición POST a /register");
    next();
});
  

module.exports = router;
