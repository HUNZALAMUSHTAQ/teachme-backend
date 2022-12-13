import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { ProposalService } from "./proposals.service";
import { ProposalValidator, QueryProposalsValidator, TeacherProposalsValidator } from "./proposals.validator";

@Controller('proposal')
export class ProposalController {
    constructor(private proposalService: ProposalService){}

    @Get()
    sayHello(){
        return 'hi from proposal '
    }
    @Post()
    async createProposal(
        @Body() createProposalValidation: ProposalValidator

    ){
        return await this.proposalService.createProposal(
            createProposalValidation.queryId,
            createProposalValidation.teacherId,
            createProposalValidation.proposalDescription,
            createProposalValidation.proposalPrice
        )
    }

    @Post('queryProposals')
    async getAllProposalsForQuery(@Body() queryProposalsValidatior: QueryProposalsValidator){
        
        const result = await this.proposalService.getAllProposalsForQuery(queryProposalsValidatior.queryId)
        return result
    }

    @Post('teacherProposals')
    async getAllProposalsForTeacher(@Body() teacherProposalValidator: TeacherProposalsValidator){
        
        const result = await this.proposalService.getAllProposalsByTeacherId(teacherProposalValidator.teacherId)
        return result
    }
}