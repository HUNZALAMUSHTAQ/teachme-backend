import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { QueryService } from "./queries.service";
import { QueryValidation, GetAllStudentQueriesValidation } from "./queries.validator";

@Controller('query')
export class QueryController {
    constructor(private queryService: QueryService){}

    @Post()
    async createQuery(
        @Body() queryValidation: QueryValidation
    ){
        return await this.queryService.createQuery(
            queryValidation.studentId,
            queryValidation.queryTitle,
            queryValidation.queryDescription,
            queryValidation.offerPrice,
            queryValidation.studyHour
        )
    }

    @Get('allQueries')
    async getAllQueries(){
        return await this.queryService.getAllQueries()
    }

    @Post('studentQueries')
    async getAllQueriesOfStudent(
        @Body() getAllStudentQueriesValidation: GetAllStudentQueriesValidation
    ){
        return await this.queryService.getAllQueriesByStudentId(
            getAllStudentQueriesValidation.studentId
        )
    }
    @Get(':id')
    async getQueryById(
        @Param('id') id: string
    ){
        return await this.queryService.getQueryById(
            id
        )
    }

    @Delete(':id')
    async deleteQueryById(
        @Param('id') id: string
    ){
        return await this.queryService.deleteQuery(
            id
        )
    }
}