import express from "express";
import { logout, login } from "../controllers/auth";
const router = express.Router();
router.post("/login", login);
router.post("/logout", logout);
export { logout, login };
