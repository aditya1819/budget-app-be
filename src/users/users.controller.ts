import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import { UsersService } from './users.service';
import { Budget } from 'src/schema/budget.schema';
import { Expense } from 'src/schema/expense.schema';

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

  @Post(':userId/budgets/:budgetId/expenses')
  async addExpense(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
    @Body() expense: Expense,
  ): Promise<Budget> {
    return this.userService.addExpenseToBudget(userId, budgetId, expense);
  }
}
