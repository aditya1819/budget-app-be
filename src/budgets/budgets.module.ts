import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetSchema } from 'src/schema/budget.schema';
import { UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }]),
  ],
  controllers: [],
  providers: [BudgetsService],
})
export class BudgetsModule {}
