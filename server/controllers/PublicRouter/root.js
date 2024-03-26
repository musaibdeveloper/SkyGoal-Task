import bcrypt from "bcrypt";
import config from "config";
import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../../model/user/User.js";
import {
    errorMiddelware,
    userRegisterValidations,
} from "../../middleware/validation.js";

const router = express.Router();

router.post(
    "/signup",
    userRegisterValidations(),
    errorMiddelware,
    async (req, res) => {
        try {
            let getNewUserData = new userModel(req.body);

            // Check If User Already exists.
            let emailCheck = await userModel.findOne({ email: getNewUserData.email });
            let passwordCheck = await userModel.findOne({
                password: getNewUserData.password,
            });

            if (emailCheck || passwordCheck) {
                return res
                    .status(200)
                    .json({ msg: "Already a User email and id exisit. Please Login!" });

            }

            // Encrypt the password.
            const HashPassword = await bcrypt.hash(getNewUserData.password, 10);
            getNewUserData.password = HashPassword;
            console.log(HashPassword);

            // Generate a Token for user and send it.
            let EmailToken = jwt.sign(
                {
                    id: getNewUserData.email,
                },
                config.get("JWTKEY"),
                { expiresIn: "1h" }
            );
            console.log(EmailToken);

            //   Save the User.
            await getNewUserData.save();
            res.status(200).json({ user: getNewUserData, token: EmailToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Internal Server Error at Signup" });
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        // Accept only two input.
        const { email, password } = req.body;

        //  Validation.
        let FindExistingUser = await userModel.findOne({ email: email });
        if (!FindExistingUser) {
            return res.status(404).json({ msg: "Email not Found" });
        }

        // Password Check
        const MatchPassword = await bcrypt.compare(
            password,
            FindExistingUser.password
        );
        if (!MatchPassword) {
            return res.status(400).json({ msg: "Incorrect Password!!" });
        }

        const token = jwt.sign(
            { email: FindExistingUser.email, id: FindExistingUser._id },
            config.get("JWTKEY"),
            { expiresIn: "1h" }
        );

        res.status(200).json({ user: FindExistingUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error at Login" });
    }
});

export default router;
