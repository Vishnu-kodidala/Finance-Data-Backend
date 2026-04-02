const Joi = require("joi");

exports.recordSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().allow("", null),
});