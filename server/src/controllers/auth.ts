import bcrypt from 'bcrypt';
import Staff from '../models/Staff.js';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Document } from "mongoose";
interface StaffDocument extends Document {
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

// Logging in
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err:any, user: StaffDocument, info:any) => {
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

      const { password, ...user1 } = user.toObject();

      res.cookie('name', JSON.stringify({ firstname: user1.name }), {
        maxAge: 60000,
        // secure: true,
      });

      res.status(200).json({ success: true, message: 'Logged in successfully' });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
