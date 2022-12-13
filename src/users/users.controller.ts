import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import {  LoginUserValidation, RegisterUserValidation } from "./users.validator";

@Controller('users')
export class UsersController {
    constructor( private userService: UsersService ){}
    
    @Get('all-users')
    async getUsers(){
        console.log('all users ')
        const allUsers = await this.userService.getUsers()
        return allUsers;
    }
    @Get(':id')
    async getUserById(
        @Param('id') id: string
    ){
        return await this.userService.findUserById(id)
    }

    @Post('register')
    async addUser(
        @Body() registerUserValidation: RegisterUserValidation
    ){
        return await this.userService.registerUser(
            registerUserValidation.email, 
            registerUserValidation.username, 
            registerUserValidation.password, 
            registerUserValidation.isTeacher, 
            registerUserValidation.description
        )
    }

    @Post('login')
    async userLogin(
        @Body() loginUserValidation: LoginUserValidation
    ){
        return await this.userService.loginUser(
            loginUserValidation.email,
            loginUserValidation.password,
            loginUserValidation.isTeacher
        )
    }


}