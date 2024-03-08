import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BudgetsService } from 'src/budgets/budgets.service';
import { Budget, BudgetDocument } from 'src/schema/budget.schema';
import { Expense, ExpenseDocument } from 'src/schema/expense.schema';
// import { Expense } from 'src/schema/expense.schema';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
    private budgetsService: BudgetsService,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async fetchUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    console.log(user.budgets[0].valueOf());
    return user;
  }

  async addBudgetToUser(
    userId: string,
    budget: Partial<Budget>,
  ): Promise<User> {
    const user = await this.fetchUser(userId);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Add the current month and year to the budget
    budget.month = currentMonth.toString();
    budget.year = currentYear;

    const newBudget = new this.budgetModel(budget);
    await newBudget.save();
    user.budgets.push(newBudget);
    return await user.save();
  }

  async addExpenseToBudget(
    userId: string,
    budgetId: string,
    expense: Expense,
  ): Promise<Budget> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const budget = await this.budgetsService.findBudgetById(user, budgetId);
    const newExpense = new this.expenseModel(expense);

    await newExpense.save();

    console.log(budget.expenses);
    if (budget.expenses) {
      budget.expenses.push(newExpense);
    } else {
      budget.expenses = [newExpense];
    }
    return await budget.save();
  }

  async getAllBudgets(userId: string) {
    return await this.budgetsService.getAllBudgets(userId);
  }

  async getBudgetDetails(userId: string, budgetId: string) {
    return await this.budgetsService.getDetails(userId, budgetId);
  }
}
