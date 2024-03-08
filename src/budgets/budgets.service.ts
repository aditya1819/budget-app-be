import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget, BudgetDocument } from 'src/schema/budget.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
  ) {}

  async findBudgetById(user: User, budgetId: string) {
    const budget = user.budgets.find(
      (budget) => budget._id.toString() === budgetId,
    );
    if (!budget) {
      throw new Error('Budget not found');
    }

    return this.budgetModel.findById(budget._id);
  }
}
