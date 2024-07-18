import { Category } from "../../../database/models/category.model.js";
import { Task } from "../../../database/models/task.model.js";
import { throwError } from "../../utils/throwerror.js";


export const addTask = async (req, res, next) => {
    try {
        const category = await Category.findById(req.body.category)
        if (!category) throw throwError('Categoy Not Found', 404)
        const task = new Task({ ...req.body, user: req.user._id });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
}

export const getTasks = async (req, res, next) => {
    const match = {};
    const sort = {};
    const searchFilters = [
        { user: req.user._id },       // Tasks owned by the authenticated user
        { shared: true }              // Shared tasks visible to everyone
    ];

    if (req.query.category) {
        match.category = req.query.category;
    }

    if (req.query.shared) {
        match.shared = req.query.shared === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const tasks = await Task.find({ $or: searchFilters, ...match })
            .limit(parseInt(req.query.limit))
            .sort(sort)
            .exec();
        res.json(tasks);
    
    } catch (err) {
    next(err)
}
}

export const getTaskById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, });
        if (!task) {
            throw throwError("Task Not Found", 404);
        }
        console.log( task.user != req.user._id);
        console.log( req.user._id);
        console.log( task.user);


        if (task.shared === false && task.user.toHexString() != req.user._id) {
            throw throwError("you dont have access to this task", 400);
        }
        res.json(task);
    } catch (err) {
        next(err);
    }
}

export const updateTask = async (req, res, next) => {

    const { id } = req.params;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            throw throwError("Task Not Found", 404);
        }
        res.json(task);
    } catch (err) {
        next(err);
    }
}

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
        if (!task) {
            throw throwError("Task Not Found", 404);
        }
        res.json(task);
    } catch (err) {
        next(err)
    }
}
