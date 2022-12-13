import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UserSchema } from "./users.model";
import { UsersService } from "./users.service";


@Module({
    imports: [MongooseModule.forFeature([{name: "Users", schema: UserSchema}])], 
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}