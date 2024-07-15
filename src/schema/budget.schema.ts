// src/budget/budget.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Expense } from './expense.schema';
import { ApiProperty } from '@nestjs/swagger';

export type BudgetDocument = Budget & Document;

@Schema()
export class Budget {
  [x: string]: any;
  @Prop({ required: true })
  @ApiProperty()
  month: string;

  @Prop({ required: true })
  @ApiProperty()
  year: number;

  @Prop({ required: true })
  @ApiProperty()
  budgetCategory: string;

  @Prop({ required: true })
  @ApiProperty()
  amount: number;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Expense.name }])
  @ApiProperty()
  expenses: Expense[];
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
