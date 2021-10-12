import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';

import TextService from '../services/TextService';
import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import Post, { PostDocument } from './Post';
import User, { UserDocument } from './User';

interface IComment extends BaseModel {
  /**
   * User that is associated with the creation of the comment.
   */
  author: PopulatedDoc<UserDocument>;

  /**
   * Text content of the comment.
   */
  content: string;

  /**
   * Post that the comment was created on.
   */
  post: PopulatedDoc<PostDocument>;
}

export type CommentDocument = Document<{}, {}, IComment> & IComment;

const commentSchema: Schema<CommentDocument> = new Schema<CommentDocument>(
  {
    author: { ref: Model.USER, required: true, type: ID },

    /**
     * Aurthor is required so it's true
     */

    content: { required: true, type: String },
    /**
     * Conent is words so it's a string
     */
    post: { ref: Model.POST, required: true, type: ID }
    /**
     * Post is required so it can be commented under so it's true
     */
  },
  { timestamps: true }
);

commentSchema.pre('save', function () {
  if (this.isNew) {
    /**
     * TODO: (6.05)
     * - Send a text to the author of the post notifying them that a podmate
     * commented under it!
     */
  }
});

const Comment: mongoose.Model<CommentDocument> =
  mongoose.model<CommentDocument>(Model.COMMENT, commentSchema);

export default Comment;
