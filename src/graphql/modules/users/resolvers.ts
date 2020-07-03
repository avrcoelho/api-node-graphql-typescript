import { PubSub } from 'apollo-server';

import User, { UserInterface } from '../../../models/User';
import { USER_ADDED } from './channels';

// o _ é o contexto, ou seja, ele retorna os dados do usuario
// em "fullName" foi trocado o _ por "user", com sso é possivel pegar a instacia do usuario

export default {
  User: {
    fullName: (user: UserInterface) => `${user.firstName} ${user.lastName}`,
  },
  Query: {
    users: () => User.find(),
    user: (_: UserInterface, { id }: { id: string }) => User.findById(id),
  },
  Mutation: {
    createUser: async (
      _: UserInterface,
      { data }: { data: UserInterface },
      { pubsub }: { pubsub: PubSub },
    ) => {
      const user = await User.create(data);

      // envio via web socket
      pubsub.publish(USER_ADDED, {
        userAdded: user,
      });

      return user;
    },
    updateUser: (
      _: UserInterface,
      { id, data }: { id: string; data: UserInterface },
    ) => User.findByIdAndUpdate(id, data, { new: true }),
    deleteUser: async (_: UserInterface, { id }: { id: string }) => {
      const deleted = await User.findByIdAndDelete(id);

      return !!deleted;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: (
        obj: UserInterface,
        args: any,
        { pubsub }: { pubsub: PubSub },
      ) => pubsub.asyncIterator(USER_ADDED),
    },
  },
};
