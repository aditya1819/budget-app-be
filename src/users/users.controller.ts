import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import { UsersService } from './users.service';
import { Budget } from 'src/schema/budget.schema';
import { Expense } from 'src/schema/expense.schema';
import { BudgetDetailsVo, BudgetsVo } from 'src/budgets/model';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({ type: User })
  @ApiTags('users')
  async create(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get(':userId')
  @ApiTags('users')
  async fetch(@Param('userId') userId: string): Promise<User> {
    return this.userService.fetchUser(userId);
  }

  @Post(':userId/budgets')
  @ApiTags('budgets')
  @ApiBody({ type: Budget })
  async addBudgetToUser(
    @Param('userId') userId: string,
    @Body() budget: Partial<Budget>,
  ): Promise<User> {
    return this.userService.addBudgetToUser(userId, budget);
  }

  @Get(':userId/budgets')
  @ApiTags('budgets')
  async getAllBudgets(@Param('userId') userId: string): Promise<BudgetsVo[]> {
    return this.userService.getAllBudgets(userId);
  }

  @Delete(':userId/budgets/:budgetId')
  @ApiTags('budgets')
  async deleteBudget(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
  ): Promise<void> {
    return this.userService.deleteBudget(userId, budgetId);
  }

  @Get(':userId/budgets/:budgetId')
  @ApiTags('budgets')
  async getBudgetDetails(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
  ): Promise<BudgetDetailsVo> {
    return this.userService.getBudgetDetails(userId, budgetId);
  }

  @Post(':userId/budgets/:budgetId/expenses')
  @ApiTags('expenses')
  @ApiBody({ type: Expense })
  async addExpense(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
    @Body() expense: Expense,
  ): Promise<Budget> {
    return this.userService.addExpenseToBudget(userId, budgetId, expense);
  }

  @Delete(':userId/budgets/:budgetId/expenses/:expenseId')
  @ApiTags('expenses')
  async deleteExpense(
    @Param('userId') userId: string,
    @Param('budgetId') budgetId: string,
    @Param('expenseId') expenseId: string,
  ): Promise<void> {
    return this.userService.deleteExpense(userId, budgetId, expenseId);
  }
}
