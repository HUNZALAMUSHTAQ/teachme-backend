import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { QueryModule } from "src/queries/queries.module";
import { UserModule } from "src/users/users.module";
import { ProposalController } from "./proposals.controller";
import { ProposalSchema } from "./proposals.model";
import { ProposalService } from "./proposals.service";



@Module({
    imports: [UserModule, QueryModule,MongooseModule.forFeature([{name: "Proposals", schema: ProposalSchema}])], 
    controllers: [ProposalController],
    providers: [ProposalService],
    exports: [ProposalService]
})
export class ProposalModule {}