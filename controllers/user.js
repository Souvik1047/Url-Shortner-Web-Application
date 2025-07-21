const User = require("../models/user");

async function usersignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

async function userlogin(req, res) {
    const { email, password } = req.body;
    const loginuser = await User.findOne({ email, password });
    if (!loginuser) { return res.render("login") }
    return res.render("home");
}
module.exports = {
    usersignup,
    userlogin
};