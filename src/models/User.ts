import { Schema, model, Document } from 'mongoose';

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  eamil?: string;
  active?: boolean;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    eamil: String,
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<UserInterface>('User', UserSchema);
