const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const app = express()
const port = 8000
const cors = require('cors');

// app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));
app.use(cors({ origin: true, credentials: true }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
require("dotenv").config()

const jwt = require("jsonwebtoken")

const uri = process.env.MONGO_URI
app.listen(port,()=> {
    console.log("server is running on port 8000");
});

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("mongodb connected successfully")
    })
    .catch((error) => {
        console.log("error connecting db : ", error)
    })
app.get("/", (req, res) => {
    res.send("Hello World")
});
app.listen(port, () => {
    console.log("server running at port ", port)
});

const User = require("./models/user");
const Order = require("./models/order");



//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transport

    const transporter = nodemailer.createTransport({
        //configure the email service
        service: "gmail",
        auth: {
            user: "sauravpatel668@gmail.com",
            pass: "glbpylwvfcfniuel",
        },
    });

    //compose the email message
    const mailOptionns = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify email : http://localhost:8000/verify/${verificationToken}`,
    };

    //send the mail
    try {
        await transporter.sendMail(mailOptionns);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
};

//endpoint to register in the app
app.post("/register", async (req, res) => {
    try {
        // for check console.log("yyhfh");
        const { name, email, password } = req.body;
        console.log(name, email)

        //check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // console.log("Email already registered:", email);
            return res.status(400).json({ messages: "Email already registered" });
        }
        console.log(name, email, password, existingUser)
        //create a new user
        const newUser = new User({ name, email, password });

        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to the database
        await newUser.save();
        // console.log("new user Registered:",newUser);
        //send the verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(200).json({message:"registration successful",});
    } catch (error) {
        console.log("error registering user", error);
        res.status(500).json({ message: "Registration Failed" });
    }
});


//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        //Find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ messages: " Invalid verification token " });
        }

        //mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Email Verification Failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};
const secretKey = generateSecretKey();

//endpoint to login the user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the user esxists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //check if thepassword is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        //generate a token 
        const token = jwt.sign({ userId: user._id }, secretKey);
        //console.log(req.body,User,token)

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});


