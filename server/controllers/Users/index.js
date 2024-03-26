import express from "express";

import userModel from "../../model/user/User.js";

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    let UserAllData = await userModel.find();
    res.status(200).json({ msg: UserAllData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let findUserbyID = await userModel.findOne({ id: id });
    if (!findUserbyID) {
      // Checking if the user with the given ID exists
      return res.status(404).json({ msg: "User not found" }); // Responding with a 404 status if user not found
    }
    res.status(200).json(findUserbyID);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
});

router.put("/update/:ID", async (req, res) => {
  try {
    let id = req.params.ID;
    let inputNewUpdate = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        $set: inputNewUpdate,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ msg: "User Updated Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let deleteuserData = req.params.id;
    await userModel.findOneAndDelete(deleteuserData);
    res.status(200).json({ msg: "User Deleted Successfully" });
    console.log(`This User with ${deleteuserData} id Data was deleted `);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    let deleteAllUser = await userModel.deleteMany({});
    res.status(200).json({ msg: "All User are Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default router;
