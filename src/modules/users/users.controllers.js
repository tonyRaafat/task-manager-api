import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../../../database/models/user.model.js";
import { throwError } from "../../utils/throwerror.js";

export const addUser = async (req, res, next) => {

    const user = new User(req.body);
    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await  bcrypt.compare(password, user.password)) {
            throw throwError('Invalid login credentials', 400);
        }
        const token = jwt.sign({ _id: user._id, email:user.email }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (err) {
        next(err);
    }
}

export const userProfile = async (req, res,next) => {
    return res.send(req.user);
  }