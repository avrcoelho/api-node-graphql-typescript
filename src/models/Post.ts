import { Schema, model, Document } from 'mongoose';

import { UserInterface } from './User';

export interface PostInterface extends Document {
  title: string;
  content: string;
  author: UserInterface;
}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export default model<PostInterface>('Post', PostSchema);
