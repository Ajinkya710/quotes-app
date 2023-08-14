import { users, quotes } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = mongoose.model("User");

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    quotes: () => {
      return quotes;
    },
    user: (_, { _id }) => users.find((user) => user._id === _id),
    quote: (_, { by }) => quotes.filter((quote) => quote.by === by),
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur._id),
  },

  Mutation: {
    createUser: async (_, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
        throw new Error("User already exists");
      } 
      const hashed_password = await bcrypt.hash(newUser.password,12)

      const createUser = new User({
        ...newUser,
        password: hashed_password
      })

      return await createUser.save()

    },
  },
};

export default resolvers;
