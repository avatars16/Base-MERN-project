import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (email) => {
                    console.log(email);
                    const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    const matches = email.match(emailValidationRegex);
                    if (matches === null) return false;
                    if (email === matches[0]) return true;
                    return false;
                },
                message: (props) => `${props.value} is not a valid email adress`,
            },
        },
        password: {
            type: String,
        },
        googleId: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    //"this" is user which is being saved
    if (!this.password && !this.googleId) {
        const err = new Error("Either password or googleId must be present");
        return next(err);
    }
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
