import { Injectable , ConflictException, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist";
import { Model } from "mongoose";
import { User } from "./users.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private readonly usersModel: Model<User>) { }
    users: User[] = [];

    async registerUser(email: string, username: string, password: string, isTeacher: boolean, description: string) {
        // check if user with this email exist in our database 
        try {
            const newUser = new this.usersModel({ email, username, password, isTeacher, description })
            const result = await newUser.save()
            return result
        } catch (e) {
            throw new ConflictException(["User Already Exists",e]  )
        }

    }

    async getUsers() {  
        const users = await this.usersModel.find().exec()
        console.log(users)
        return users
        // return users.map(user=>({
        //     id: user.id,
        //     email: user.email,
        //     username: user.username,
        //     password: user.password,
        //     isTeacher: user.isTeacher,
        //     description: user.description
        // }))
    }

    async loginUser(email: string,password: string, isTeacher: boolean){
        let user = null;
        if(isTeacher){
            user = await this.usersModel.findOne({email: email, isTeacher: true})
            console.log(user, 'u are teacher')
        }else{
            user = await this.usersModel.findOne({email: email,isTeacher: false})
            console.log(user, 'u are student')            
        }

        if(user && user.password !== password){
            throw new ConflictException("Wrong password")
        }
        if(!user){
            throw new NotFoundException(" user not found or wrong email")
        }
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
            isTeacher: user.isTeacher,
            description: user.description
        }

    }


    async findUserById(id: string): Promise<User>{
        let user
        try{
            user = await this.usersModel.findById(id)

        } catch (e) {
            throw new NotFoundException(" user not found ")
        }
        return user
    }
} 