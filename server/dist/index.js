import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassport } from "./middleware/passport.js";
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import { login, logout } from "./routes/auth.js";
import { addStaff, getStaff, deleteStaff, updateStaff, getStaffInfo } from "./routes/staff.js";
import { deleteDelivery, getDelivery, getDeliveryInfo, updateDelivery } from "./routes/delivery.js";
import { deleteClient, updateClient, addClient, getClient, getClientInfo } from "./routes/client.js";
import { getPack, updatePack } from "./routes/pack.js";
import { addItem, getItem, deleteItem, updateItem, checkout, getItemInfo } from "./routes/received.js";
import { addStagedItem, getStagedItem, deleteStagedItem, updateStagedItem, getStagedItemInfo } from "./routes/staged.js";
//const url = 'http://localhost:5173'
//const url = "http://127.0.0.1:5173"
const url = 'https://xpresss.vercel.app';
const app = express();
app.use(express.json());
app.use(cors({
    origin: url,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));
dotenv.config(); // Load environment variables from .env file
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    console.error('MongoDB connection string is not defined.');
    process.exit(1); // Exit the process with an error code
}
//AUTHENTICATION    
initializePassport(passport);
const sessionStore = new (MongoDBStore(session))({
    uri: mongoUrl, // MongoDB connection URL
    collection: 'sessions', // Collection to store sessions in
    //autoRemove: 'interval', // Automatically remove expired sessions
    //autoRemoveInterval: 1, // Interval in minutes for session cleanup
});
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : "default-secret",
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 21600000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize());
app.use(passport.session());
// MONGOOSE SETUP
// const PORT: string | undefined = process.env.PORT || '5000';
// const portNumber: number = parseInt(PORT, 10) || 5000;
const PORT = process.env.PORT;
mongoose
    .connect(mongoUrl)
    // , { 
    //     //useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // })
    .then(() => {
    app.listen(PORT, "localhost", () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
// ROUTES
app.use("/login", login);
app.use("/logout", logout);
app.use("/addStaff", addStaff);
app.use("/getStaff", getStaff);
app.use("/getStaffInfo", getStaffInfo);
app.use("/deleteStaff", deleteStaff);
app.use("/updateStaff", updateStaff);
app.use("/checkout", checkout);
app.use("/addItem", addItem);
app.use("/getItem", getItem);
app.use("/getItemInfo", getItemInfo);
app.use("/deleteItem", deleteItem);
app.use("/updateItem", updateItem);
app.use("/addStagedItem", addStagedItem);
app.use("/getStagedItem", getStagedItem);
app.use("/getStagedItemInfo", getStagedItemInfo);
app.use("/deleteStagedItem", deleteStagedItem);
app.use("/updateStagedItem", updateStagedItem);
app.use("/getPack", getPack);
app.use("/updatePack", updatePack);
app.use("/getDelivery", getDelivery);
app.use("/getDeliveryInfo", getDeliveryInfo);
app.use("/deleteDelivery", deleteDelivery);
app.use("/updateDelivery", updateDelivery);
app.use("/addClient", addClient);
app.use("/getClient", getClient);
app.use("/getClientInfo", getClientInfo);
app.use("/deleteClient", deleteClient);
app.use("/updateClient", updateClient);
