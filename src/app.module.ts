import { Module } from '@nestjs/common';
import { BudgetsModule } from './budgets/budgets.module';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
@Module({
  imports: [BudgetsModule, UsersModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
