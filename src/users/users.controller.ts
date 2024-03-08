import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import { UsersService } from './users.service';
import { Budget } from 'src/schema/budget.schema';
import { Expense } from 'src/schema/expense.schema';
import { BudgetDetailsVo, BudgetsVo } from 'src/budgets/model';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get(':userId')
  async fetch(@Param('userId') userId: string): Promise<User> {
    return this.userService.fetchUser(userId);
  }

  @Post(':userId/budgets')
  async addBudgetToUser(
    @Param('userId') userId: string,
    @Body() budget: Partial<Budget>,
  ): Promise<User> {
    return this.userService.addBudgetToUser(userId, budget);
  }

  @Get(':userId/budgets')
  async getAllBudgets(@Param('userId') userId: string): Promise<BudgetsVo[]> {
    return this.userService.getAllBudgets(userId);
  }

  @Get(':userId/budgets/:budgetId')
  async getBudgetDetails(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
  ): Promise<BudgetDetailsVo> {
    return this.userService.getBudgetDetails(userId, budgetId);
  }

  @Post(':userId/budgets/:budgetId/expenses')
  async addExpense(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
    @Body() expense: Expense,
  ): Promise<Budget> {
    return this.userService.addExpenseToBudget(userId, budgetId, expense);
  }
}
