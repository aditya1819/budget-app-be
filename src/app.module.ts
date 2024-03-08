import { Module } from '@nestjs/common';
import { BudgetsModule } from './budgets/budgets.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BudgetsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
      dbName: 'budget-app',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
