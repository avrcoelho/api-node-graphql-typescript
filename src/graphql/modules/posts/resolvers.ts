import Post, { PostInterface } from '../../../models/Post';

export default {
  Query: {
    posts: () => Post.find(),
    post: (_: PostInterface, { id }: { id: string }) => Post.findById(id),
  },
  Mutation: {
    createPost: (_: PostInterface, { data }: { data: PostInterface }) =>
      Post.create(data),
    updatePost: (
      _: PostInterface,
      { id, data }: { id: string; data: PostInterface },
    ) => Post.findByIdAndUpdate(id, data, { new: true }),
    deletePost: async (_: PostInterface, { id }: { id: string }) => {
      const deleted = await Post.findByIdAndDelete(id);

      return !!deleted;
    },
  },
};
