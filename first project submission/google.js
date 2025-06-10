const express = require('express');
const User = require('../../models/User');
const { generateToken } = require('../../authentication');

const router = express.Router();

router.post('/google', async (req, res) => {
    const { email, username, profileImg } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, username, profileImg });
            await user.save();
        }
        const token = generateToken({ _id: user._id, role: "user" });
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

router.get('google-login', async (req, res) => {
    const { email } = req.body;
    try {
    const user = await User.findOne({ username });
    res.json(user);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
    
});

module.exports = router;
