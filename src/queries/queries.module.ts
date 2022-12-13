import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/users/users.module";
import { QueryController } from "./queries.controller";
import {  QuerySchema } from "./queries.model";
import { QueryService } from "./queries.service";



@Module({
    imports: [UserModule ,MongooseModule.forFeature([{name: "Queries", schema: QuerySchema}])], 
    controllers: [QueryController],
    providers: [QueryService],
    exports: [QueryService]
})
export class QueryModule {}