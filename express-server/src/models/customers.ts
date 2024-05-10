import mongoose from 'mongoose';

interface UserModel {
    username: string;
    fullName: string;
    email: string;
    password: string;
    orders: string[];
    accountBalance: number;
}


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    orders: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}]
      },
    accountBalance: { type: Number, default: 0 }
});

export const UserModel = mongoose.model('customers', UserSchema)

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)

