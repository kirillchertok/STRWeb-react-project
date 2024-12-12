import { IUser } from "./IUser";

export interface IFeedback{
    userId: IUser;
    rate: Number;
    text: string;
    createdAt: string;
}