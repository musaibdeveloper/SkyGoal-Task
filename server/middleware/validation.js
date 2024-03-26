import { body, validationResult } from "express-validator";

const userRegisterValidations = () => {
  return [


    body("firstName", "First Name is required")
      .notEmpty(),

    body("lastName", "Last Name is Required")
      .notEmpty(),

    body("email", "Should be a Valid Email").isEmail(),

    body("phone", "Should be a Valid Phone Number").isMobilePhone(),

    body("password", "Should be a Strong Password")
      .isStrongPassword()
      .isLength({ min: 8, max: 16 }),

    body("address", "Address is Required").isLength({ min: 5, max: 100 }),
  ];
};

const errorMiddelware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json(errors);
  }
  return next();
};

export { userRegisterValidations, errorMiddelware };
