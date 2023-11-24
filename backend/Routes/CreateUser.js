const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "Mynameis1$4"

router.post("/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 3 }),
        body('password', 'Incorrect Password').isLength({ min: 5 }),
        body('location').notEmpty().withMessage('Location is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: hashedPassword
            });

            return res.json({ success: true, message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }
);

router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const userData = await User.findOne({ email: req.body.email });
            if (!userData) {
                return res.status(400).json({ success: false, message: "User not found" });
            }

            const isPasswordMatch = await bcrypt.compare(req.body.password, userData.password);
            if (!isPasswordMatch) {

                return res.status(400).json({ success: false, message: "Wrong password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }
);

module.exports = router;
