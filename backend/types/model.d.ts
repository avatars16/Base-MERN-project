import { Model } from "sequelize-typescript";
import User from "../src/models/user.model";

type WithoutModel<T> = Omit<T, keyof Model>;
export type UserBody = WithoutModel<User>;
