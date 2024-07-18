import { Category } from "../../../database/models/category.model.js";
import { throwError } from "../../utils/throwerror.js";

export const addCategry = async (req, res, next) => {
 
  const category = new Category({ ...req.body, user: req.user._id });
  try {
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    next(err)
  }
}

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.send(categories);
  } catch (err) {
    next(err)
  }
}

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ _id: id, user: req.user._id });
    if (!category) {
      throw throwError('Category Not Found!',404)
    }
    res.send(category);
  } catch (err) {
    next(err)
  }
}


export const UpdateCategory = async (req, res, next) => {

  const { id } = req.params;
  try {
    const category = await Category.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
        throw throwError('Category Not Found!',404)
    }
    res.send(category);
  } catch (err) {
    next(err)
  }
}

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findOneAndDelete({ _id: id, user: req.user._id });
    if (!category) {
        throw throwError('Category Not Found!',404)
    }
    res.send(category);
  } catch (err) {
    next(err)
  }
}
