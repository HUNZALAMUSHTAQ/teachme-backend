import { IsEmail, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';

// const roles = ['teacher', 'student']

export class RegisterUserValidation{ 
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(5)
    username: string

    @MinLength(6)
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @MinLength(20)
    description: string

    @IsBoolean()
    @IsNotEmpty()
    isTeacher: boolean
}

export class LoginUserValidation{
    @IsEmail()
    email: string

    @MinLength(6)
    @IsNotEmpty()
    password: string

    
    @IsBoolean()
    @IsNotEmpty()
    isTeacher: boolean

}