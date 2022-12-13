import { IsEmail, IsNotEmpty, MinLength, IsBoolean,IsInt,IsString } from 'class-validator';


export class QueryValidation{ 

    @IsString()
    @IsNotEmpty()
    studentId: string;

    @IsString()
    @IsNotEmpty()
    queryTitle: string;

    @IsString()
    @IsNotEmpty()
    queryDescription: string;

    @IsInt()	
    @IsNotEmpty()
    offerPrice: number;

    @IsInt()	
    @IsNotEmpty()
    studyHour: number;

}

export class GetAllStudentQueriesValidation{ 
    @IsString()
    @IsNotEmpty()
    studentId: string;
}
