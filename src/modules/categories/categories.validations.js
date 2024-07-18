import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().min(1).required(),
});

export const updateCategorySchema = Joi.object({
    id: Joi.string().hex().required(),
    name: Joi.string().min(1).required(),
}).unknown(false);