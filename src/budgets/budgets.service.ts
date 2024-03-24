import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Budget, BudgetDocument } from 'src/schema/budget.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { BudgetDetailsVo, BudgetsVo } from './model';
import { Expense, ExpenseDocument } from 'src/schema/expense.schema';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
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

  async getAllBudgets(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'budgets',
        populate: { path: 'expenses' },
      })
      .exec();
    if (!user) {
      throw new Error('User not found');
    }

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    // Filter budgets for the current month
    user.budgets = (user.budgets ?? []).filter(
      (budget) =>
        budget.month === currentMonth.toString() && budget.year === currentYear,
    );

    // Now, user.budgets contains the full budget documents
    return user.budgets.map((budget) => new BudgetsVo(budget));
  }

  async getDetails(userId: string, budgetId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'budgets',
        match: { _id: new mongoose.Types.ObjectId(budgetId) }, // Filter budgets by ID
        populate: { path: 'expenses' }, // Populate expenses within the matched budget
      })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    return new BudgetDetailsVo(user.budgets[0]);
  }

  async deleteBudget(userId: string, budgetId: string) {
    try {
      const budget = await this.getDetails(userId, budgetId);
      const expenses = (budget.expenses ?? []).map((expense) => expense.id);

      if (expenses.length) {
        await this.expenseModel.deleteMany({ _id: { $in: expenses } });
      }

      await this.budgetModel.deleteOne({ _id: budget.id });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
