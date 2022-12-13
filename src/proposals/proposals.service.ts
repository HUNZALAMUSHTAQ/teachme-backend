import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist";
import { Model } from "mongoose";
import { QueryService } from "src/queries/queries.service";
import { UsersService } from "src/users/users.service";
import { Proposal } from "./proposals.model";
import { Types } from 'mongoose';

@Injectable()
export class ProposalService {
    constructor(
        @InjectModel('Proposals') private readonly proposalModel: Model<Proposal>,
        private userService: UsersService,
        private queryService: QueryService
    ) { }

    async createProposal(queryId: string, teacherId: string, proposalDescription: string, proposalPrice: number) {
        const user = await this.userService.findUserById(teacherId)
        const query = await this.queryService.getQueryById(queryId)
        if (user.isTeacher === false) {
            throw new ConflictException("student can't propose to a query")
        }
        console.log(query)

        const proposal = await this.proposalModel.create({
            queryId, teacherId, proposalDescription, proposalPrice, isAccepted: false
        })
        console.log(proposal)

        const success = await this.queryService.addProposalToQuery(queryId, proposal)
        console.log(success)
        if (!success) {
            proposal.delete()
            throw new ConflictException("can't add proposal to the this query ")
        }
        return proposal
    }

    async getProposalByOid(proposalOid) {
        try {
            const proposal = await this.proposalModel.find({ id: proposalOid })
            console.log(proposal)
            return proposal
        } catch (e) {
            throw new NotFoundException(["no such query is found", e.message])
        }

    }


    async getAllProposalsByTeacherId(teacherId: string) {
        // aggregation pipeline 
        try {
            const teacherProposals = await this.proposalModel.aggregate(
                [
                    {
                        '$match': {
                            'teacherId': `${teacherId}`
                        }
                    }, {
                        '$addFields': {
                            'queryId': {
                                '$toObjectId': '$queryId'
                            }
                        }
                    }, {
                        '$lookup': {
                            'from': 'queries',
                            'localField': 'queryId',
                            'foreignField': '_id',
                            'as': 'query'
                        }
                    }, {
                        '$unwind': '$query'
                    }
                ]
            )
            return teacherProposals

        } catch(e){
            throw new NotFoundException(["No Proposal Found", e.message])

        }

    }
    async getAllProposalsForQuery(queryId: string) {
        console.log(queryId, 'sdfdsf')
        // const query = await this.queryService.getQueryById(queryId)

        return await this.queryService.getAllProposalsOfQuery(queryId)

        // console.log(query, '------')
        // const result = query.proposals
        // // console.log(result)
        // const data = result.map(async id=>(
        //    await this.proposalModel.findById(id)
        // ))
        // console.log(data , '333333333333333333')
        // return result
    }
} 