import mongoose from 'mongoose';
import { userSchema, IUser } from '../schema/userSchema';

export const User = mongoose.model<IUser>('User', userSchema);