import { Strategy } from 'passport-local';
import Staff from "../models/Staff.js";
import bcrypt from 'bcrypt';
const LocalStrategy = Strategy;
export function initializePassport(passport) {
    const authenticateUser = async (staffId, password, done) => {
        try {
            const user = await Staff.findOne({ staffId: staffId });
            if (!user) {
                return done(null, false, { message: "No user found with this email address" });
            }
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: "Incorrect password" });
                }
            }
            catch (e) {
                return done(e);
            }
        }
        catch (error) {
            return done(error);
        }
    };
    passport.use(new LocalStrategy({ usernameField: "staffId", passwordField: "password" }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.staffId);
    });
    passport.deserializeUser(async (staffId, done) => {
        try {
            //const user = await Staff.findById(id);
            const user = await Staff.findOne({ staffId: staffId });
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
}
export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized: User is not authenticated" });
}
