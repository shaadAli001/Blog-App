const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

// register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all fields",
            });
        }
        //exisiting user
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: "user already exisits",
            });
        }

        // password Hashing
        const hashedPasswrd = await bcrypt.hash(password, 10);

        //save new user
        const user = new userModel({ username, email, password: hashedPasswrd });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error In Register callback",
            success: false,
            error,
        });
    }
};


exports.getAllUser = async (req, res) => {
    try {
        const user = await userModel.find({});
        return res.status(201).send({
            userCount: user.length,
            success: true,
            message: "All Users",
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error!!",
            success: false,
            error,
        })
    }
};


exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please Enter Email or Password!",
            })
        }

        // Existing user uing Email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(402).send({
                success: false,
                message: "Email Not Registered",
            });
        };

        // Compairing Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid Email or Password",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Login Successful",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error!!",
            error
        });
    };
};