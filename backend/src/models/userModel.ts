import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";

interface IUser {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
}

interface UserDocument extends IUser, Document {}

interface UserModelDocument extends UserDocument {
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<UserModelDocument> = new mongoose.Schema(
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
                validator: (email: string) => {
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

userSchema.pre("save", async function (this: UserModelDocument, next) {
    //"this" is user which is being saved
    if (!this.password && !this.googleId) {
        const err = new Error("Either password or googleId must be present");
        return next(err);
    }
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    if (this.password) this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
export { UserDocument };
