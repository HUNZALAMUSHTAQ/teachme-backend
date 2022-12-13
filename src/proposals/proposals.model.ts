import mongoose from 'mongoose'


export interface Proposal{
    queryId: string;
    teacherId: string,
    proposalDescription: string,
    proposalPrice: number, 
    isAccepted: boolean
}


export const ProposalSchema = new mongoose.Schema({
    queryId: {type: String, required: true},
    teacherId: {type: String, required: true},
    proposalDescription: {type: String, required: true},
    proposalPrice: {type: Number, required: true},
    isAccepted: {type: Boolean, required: true}
})



