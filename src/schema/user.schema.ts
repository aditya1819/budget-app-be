import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Budget } from './budget.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    message: 'Please provide a valid email',
  })
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  })
  contact: number;

  @Prop({ default: false })
  notificationPref: boolean;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Budget.name }])
  budgets: Budget[];
}

export const UserSchema = SchemaFactory.createForClass(User);
