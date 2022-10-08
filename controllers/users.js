const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            // Else
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds')
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    // TODO: Delete this before launch
    // console.log("returnTo = ", req.session.returnTo)
    // console.log("returnTo = ", req.session)
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
    });
    req.flash('success', "You've successfuly logged out.")
    res.redirect('/campgrounds');
}