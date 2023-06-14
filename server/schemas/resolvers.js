import  {Book, User} from '../models';
import {AuthenticationError } from 'apollo-server-express';
import {signToken} from '../utils/auth';

export const resolvers = {
    Query: {
        me: async(parent, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id})
            } else {
                throw new AuthenticationError('User is not logged in')
            }
        }
    },
    Mutation: {
        login: async(parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('No user found with this email address')
            }
            const correctPw = await User.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Not the correct password')
            }
            const token = signToken(user);
            return {token, user};

        },
        addUser: async(parent, {username, email, password}) => {
            const user = User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async(parent, args, context) => {
           if(context.user){
            const newBook = await Book.create(args.bookData);
            const user = await User.findOneAndUpdate({_id: context.user._id},
                {$addToSet: {savedBooks: newBook}}, {new: true});
             return user;
           }
           throw new AuthenticationError('You need to be logged in to create a book')


        },
        removeBook: async(parent, args, context) => {
            if(context.user){
               const removedBook =  await Book.findOneAndUpdate({
                    _id: context.user._id
                }, 
                {$pull: {savedBooks: args.bookId}}, {new: true});
                return removedBook;
            }
            throw new AuthenticationError('User is not logged in')
        }
    }
};

