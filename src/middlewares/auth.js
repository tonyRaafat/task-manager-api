import jwt from 'jsonwebtoken';
import { throwError } from '../utils/throwerror.js';
import { User } from '../../database/models/user.model.js';

export const auth = async (req, res, next) => {
 
  try {
    if (req?.header('token') == undefined) { throw throwError('token was not provided in header', 400) }
    const token = req.header('token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '2h' });
    if (!decoded?.email) throw throwError('invalid token payload', 400)
    const user = await User.findById(decoded._id)
    req.user = user
    next();
  } catch (error) {
    next(error)
  }
};



