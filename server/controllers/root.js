import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/user/user.js";

import { errorMiddelware, userRegisterValidations } from "../middleware/validation.js";

const publicRouter = express.Router();

publicRouter.post("/signup", userRegisterValidations(), errorMiddelware,  async (req, res) => {
    try {
        let getNewUserData = new userModel(req.body);

        // Check If User Already exists. 
        let emailCheck = await userModel.findOne({ email: getNewUserData.email });
        let idCheck = await userModel.findOne({ id: getNewUserData.id });

        if (emailCheck || idCheck) {
            res.status(200).json({ msg: "Already a User email and id exisit. Please Login!" })
        }

        await getNewUserData.save();
        res.status(200).json({ msg: "User Registration is Successfull. " })



    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error at Login" })
    }
})

export default publicRouter;