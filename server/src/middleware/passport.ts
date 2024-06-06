import { Strategy } from 'passport-local';
import Staff from "../models/Staff.js"; 
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

const LocalStrategy = Strategy;

interface StaffDocument {
    staffId: string;
    name: string;
    branch: string;
    sex: string;
    role: string;
    address: string;
    contact: number;
    dob: Date;
    email: string;
    password: string;
}

export function initializePassport(passport: any) {
    const authenticateUser = async (staffId: string, password: string, done: any) => {
        try {
            const user = await Staff.findOne({ staffId: staffId });

            if (!user) {
                return done(null, false, { message: "No user found with this email address" });
            }

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect password" });
                }
            } catch (e) {
                return done(e);
            }
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: "staffId", passwordField: "password" }, authenticateUser));

    passport.serializeUser((user: StaffDocument, done:any) => {
        done(null, user.staffId);
    });

    passport.deserializeUser(async (staffId: string, done:any) => {
        try {
            //const user = await Staff.findById(id);
            const user = await Staff.findOne({ staffId: staffId }); 
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

export function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized: User is not authenticated" });
}
