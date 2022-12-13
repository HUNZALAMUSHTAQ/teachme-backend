
import { IsEmail, IsNotEmpty, MinLength, IsBoolean,IsInt,IsString } from 'class-validator';

export class ProposalValidator{ 

    @IsString()
    @IsNotEmpty()
    queryId: string;

    @IsString()
    @IsNotEmpty()
    teacherId: string

    @IsString()
    @IsNotEmpty()
    proposalDescription: string;

    @IsInt()	
    @IsNotEmpty()
    proposalPrice: number;

}

export class QueryProposalsValidator{ 

    @IsString()
    @IsNotEmpty()
    queryId: string;


}

export class TeacherProposalsValidator{ 

    @IsString()
    @IsNotEmpty()
    teacherId: string;


}