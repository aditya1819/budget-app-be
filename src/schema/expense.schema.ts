// src/expense/expense.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
  [x: string]: any;
  @Prop({ required: true })
  @ApiProperty()
  date: Date;

  @Prop({ required: true })
  @ApiProperty()
  detail: string;

  @Prop({ required: true })
  @ApiProperty()
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
