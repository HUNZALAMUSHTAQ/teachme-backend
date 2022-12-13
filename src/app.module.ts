import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose'
import { QueryModule } from './queries/queries.module';
import { ProposalModule } from './proposals/proposals.module';

@Module({
  imports: [UserModule, QueryModule, ProposalModule, MongooseModule.forRoot("mongodb+srv://hanzla1702:1234@cluster007.xstzvuy.mongodb.net/teachme?retryWrites=true&w=majority"),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
