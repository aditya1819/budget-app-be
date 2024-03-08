import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { BudgetSchema } from 'src/schema/budget.schema';
import { BudgetsService } from 'src/budgets/budgets.service';
import { ExpenseSchema } from 'src/schema/expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }]),
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, BudgetsService],
})
export class UsersModule {}
