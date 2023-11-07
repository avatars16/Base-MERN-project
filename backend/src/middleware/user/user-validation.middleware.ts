import { check } from "express-validator";
import User from "../../models/user.model";

//Validations list: https://github.com/validatorjs/validator.js
//Inspiration: SocialEcho: https://github.com/nz-m/SocialEcho/blob/main/server/middlewares/users/usersValidator.js
//Yt tutorial: https://www.youtube.com/watch?v=WvwMAJU1bd4
const addUserValidator = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("nl-NL", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .custom((value, { req }) => {
            switch (true) {
                case value.length === 1:
                    throw new Error("Name must be at least 2 characters long");
                case value.length > 20:
                    throw new Error("Name cannot be more than 20 characters long");
                default:
                    return true;
            }
        })
        .trim(),
    check("email")
        .exists()
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail()
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ where: { email: value } });
                if (user) {
                    throw new Error("There is already an account associated with this email address");
                }
            } catch (err) {
                throw err;
            }
        }),
    check("password", "Please enter a password with 6 or more characters")
        .isLength({ min: 6 })
        .custom((value) => {
            const uppercaseRegex = /[A-Z]/;
            if (!uppercaseRegex.test(value)) throw new Error("Password should include a capital letter");
            const lowercaseRegex = /[a-z]/;
            if (!lowercaseRegex.test(value)) throw new Error("Password should include a lower case letter");
            const numberRegex = /[0-9]/;
            if (!numberRegex.test(value)) throw new Error("Password should include a number");
            const specialCharsRegex = /!@#$%^&*-_=;,.?\/\\|~`"'(){}\[\]<>/;
            if (!specialCharsRegex.test(value))
                throw new Error("Password should one of the following chars" + specialCharsRegex);
        }),
];

export default addUserValidator;
