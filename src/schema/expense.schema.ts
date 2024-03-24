// src/expense/expense.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
  [x: string]: any;
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
