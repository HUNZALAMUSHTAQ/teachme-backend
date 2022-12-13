import mongoose from 'mongoose'
import { Proposal } from 'src/proposals/proposals.model';

// export interface Proposal{
//     queryId: string;
//     teacherId: string,
//     proposalDescription: string,
//     proposalPrice: number, 
//     isAccepted: boolean
// }

export interface Query {
    id: string;
    studentId: string;
    queryTitle: string;
    queryDescription: string;
    offerPrice: number;
    studyHour: number;
    proposals: Proposal[]
}

// export const ProposalSchema = new mongoose.Schema({
//     queryId: {type: String, required: true},
//     teacherId: {type: String, required: true},
//     proposalDescription: {type: String, required: true},
//     proposalPrice: {type: Number, required: true},
//     isAccepted: {type: Boolean, required: true}
// })

export const QuerySchema = new mongoose.Schema({
    studentId: {type: String, required: true},
    queryTitle: {type: String, required: true},
    queryDescription: {type: String, required: true},
    offerPrice: {type: Number, required: true},
    studyHour: {type: Number, required: true},
    proposals:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposals', unique: false }],
})



