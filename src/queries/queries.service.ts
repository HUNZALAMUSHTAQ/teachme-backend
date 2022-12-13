import { Injectable , ConflictException, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist";
import { Model } from "mongoose";
import { Proposal } from "src/proposals/proposals.model";
import { UsersService } from "src/users/users.service";
import {  Query } from "./queries.model";

@Injectable()
export class QueryService {
    constructor(
        @InjectModel('Queries') private readonly queryModel: Model<Query>, 
        // @InjectModel('Proposals') private readonly proposalModel: Model<Proposal> ,
        private userService : UsersService
    ){}

    async createQuery(studentId: string, queryTitle: string, queryDescription: string, offerPrice: number, studyHour: number ) {
        const user = await this.userService.findUserById(studentId)
        if(user.isTeacher === true){
            throw new ConflictException("teachers can't post query but u can propose to them  ")
        }

        const query = await this.queryModel.create({studentId, queryTitle, queryDescription, offerPrice, studyHour})
        console.log(query)   
        return query
    }

    async getAllQueriesByStudentId(studentId: string){
        const user = await this.userService.findUserById(studentId)
        const allQueriesOfStudent = await this.queryModel.find({studentId: user.id})
        return allQueriesOfStudent
    }

    async deleteQuery(queryID: string){
        try{
            const query = await this.queryModel.findByIdAndDelete(queryID)
            return query.id
        } catch (e){
            throw new NotFoundException(["no such query is found", e.message])
        }
    }

    async addProposalToQuery(queryId: string, proposal: Proposal){
        try{
            const query = await this.queryModel.findById(queryId)
            console.log(proposal)
            query.proposals.push(proposal)
            query.save()
            return query.id
        } catch (e){
            throw new NotFoundException(["no such query is found", e.message])
        }
    }

    async getQueryById(queryID: string){
        try{
            console.log(queryID)
            const query = await this.queryModel.findById(queryID)
            console.log(query)
            return query
        } catch (e){
            throw new NotFoundException(["no such query is found", e.message])
        }
    }

    async getAllQueries(){
        try{
            const query = await this.queryModel.find()
            console.log(query)
            return query
        } catch (e){
            throw new NotFoundException(["no such query is found", e.message])
        }
    }
    // async createPropal()

    async getAllProposalsOfQuery(queryId: string){
        // const allQueries = await this.queryModel.aggregate(
        //     [
        //         {
        //           '$lookup': {
        //             'from': 'proposals', 
        //             'localField': 'proposals', 
        //             'foreignField': '_id', 
        //             'as': 'proposals'
        //           }
        //         }
        //         
        //       ]
        // );
        
        try{
            const allQueries = await this.queryModel.findById(queryId).populate({path: 'proposals'}).exec();
            return allQueries

        } catch(e){
            throw new NotFoundException(["no such query is found", e.message])
        }
        // allQueries.proposals[0].isAccepted = true
        // allQueries.save()
    }
} 