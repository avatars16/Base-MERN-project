import { IUser } from "../src/models/userModel";

declare global {
    namespace Express {
        export interface Request {
            user?: UserDocument;
        }
    }
}
