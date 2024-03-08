import { Budget } from 'src/schema/budget.schema';
import { Expense } from 'src/schema/expense.schema';

export class BudgetsVo {
  id: string;
  title: string;
  total: number;
  consumed: number;
  constructor(budget: Budget) {
    this.id = budget._id;
    this.title = budget.budgetCategory;
    this.total = budget.amount;
    this.consumed = (budget.expenses ?? []).reduce((acc, exp) => {
      return (acc += exp.amount);
    }, 0);
  }
}

export class ExpenseVo {
  id: string;
  title: string;
  amount: number;

  constructor(expense: Expense) {
    this.id = expense._id;
    this.title = expense.detail;
    this.amount = expense.amount;
  }
}

export class BudgetDetailsVo {
  id: string;
  title: string;
  total: number;
  consumed: number;
  expenses: ExpenseVo[];
  constructor(budget: Budget) {
    this.id = budget._id;
    this.title = budget.budgetCategory;
    this.total = budget.amount;
    this.consumed = (budget.expenses ?? []).reduce((acc, exp) => {
      return (acc += exp.amount);
    }, 0);
    this.expenses = (budget.expenses ?? []).map((exp) => new ExpenseVo(exp));
  }
}
