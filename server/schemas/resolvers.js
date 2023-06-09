import  {Book, User} from '../models';

export const resolvers = {
    Query: {
        me: async() => {
            return await User.findById()
        }

    },
    Mutation: {
        login: async() => {

        },
        addUser: async() => {

        },
        saveBook: async() => {

        },
        removeBook: async() => {
            
        }

    }
};

