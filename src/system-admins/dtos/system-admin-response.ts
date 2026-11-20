import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";
export class SystemAdminResponse{
    _id:ObjectId;
    name:string;
    email:string;
    @Exclude()
    password:string;
    isSuperAdmin:boolean;
    isDeleted:boolean;
    deletedAt:Date;
}