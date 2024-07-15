import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Budget } from './budget.schema';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty()
  firstName: string;

  @Prop({ required: true })
  @ApiProperty()
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    message: 'Please provide a valid email',
  })
  @ApiProperty()
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
    length: 10,
  })
  @ApiProperty()
  contact: number;

  @Prop({ default: false })
  @ApiProperty()
  notificationPref: boolean;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Budget.name }])
  @ApiProperty()
  budgets: Budget[];
}

export const UserSchema = SchemaFactory.createForClass(User);
