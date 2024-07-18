import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  type: Joi.string().valid('text', 'list').required(),
  body: Joi.string().when('type', { is: 'text', then: Joi.required() }),
  items: Joi.array().items(Joi.object({ text: Joi.string().required() })).when('type', { is: 'list', then: Joi.required() }),
  shared: Joi.boolean(),
  category: Joi.string().required(),
});

export const updateTaskSchema = Joi.object({
    id: Joi.string().hex().required(),
    title: Joi.string().min(1),
    type: Joi.string().valid('text', 'list'),
    body: Joi.string().when('type', { is: 'text', then: Joi.required() }),
    items: Joi.array().items(Joi.object({ text: Joi.string().required() })).when('type', { is: 'list', then: Joi.required() }),
    shared: Joi.boolean(),
    category: Joi.string(),
  }).unknown(false).min(2);

