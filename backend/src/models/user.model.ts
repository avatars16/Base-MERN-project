import { Table, Column, Model, IsEmail, Unique, BeforeSave, Length } from "sequelize-typescript";
import { sequelize } from "../config/sequilize";
import bcrypt from "bcryptjs";

//Used this site for typescript notation: https://www.npmjs.com/package/sequelize-typescript
//Used this for hooks(beforeSave): https://sequelize.org/docs/v6/other-topics/hook
@Table
export default class User extends Model {
    @Length({ min: 3 })
    @Column
    declare name: string;

    @IsEmail
    @Unique
    @Column //Column needs to be the last @ in the list
    declare email: string;

    @Column
    declare password: string;

    @Unique
    @Column
    declare googleId: string;

    @BeforeSave
    static async hashPassword(user: User): Promise<void> {
        if (!user.password && !user.googleId) {
            throw new Error("Either password or googleId must be present");
        }
        if (!user.password || !user.changed("password")) return;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    async matchPassword(enteredPassword: string): Promise<boolean> {
        if (!this.password) throw new Error("User has no password");
        return await bcrypt.compare(enteredPassword, this.password);
    }
}

sequelize.addModels([User]);
