import passport from 'passport';
// Logging in
export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        req.logIn(user, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // const { password, ...user1 } = user.toObject();
            // res.cookie('name', JSON.stringify({ firstname: user1.name }), {
            //   maxAge: 60000,
            //   // secure: true,
            // });
            res.status(200).json({ success: true, message: 'Logged in successfully', firstname: user.name, role: user.role });
        });
    })(req, res, next);
};
export const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};
