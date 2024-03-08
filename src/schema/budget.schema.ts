// src/budget/budget.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Expense } from './expense.schema';

export type BudgetDocument = Budget & Document;

@Schema()
export class Budget {
  [x: string]: any;
  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  budgetCategory: string;

  @Prop({ required: true })
  amount: number;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Expense.name }])
  expenses: Expense[];
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
