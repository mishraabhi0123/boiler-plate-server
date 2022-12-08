const Joi = require('joi')

const createUserInput = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().min(3).max(40).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const updateUserInput = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().min(3).max(40),
  email: Joi.string().email().min(3).max(40),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports = {
  createUserInput,
  updateUserInput,
}