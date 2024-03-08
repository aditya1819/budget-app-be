import { Module } from '@nestjs/common';
import { BudgetsModule } from './budgets/budgets.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './budgets/expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BudgetsModule,
    UsersModule,
    ExpensesModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/', {
      dbName: 'budget-app',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
