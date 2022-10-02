import Joi from "joi";

export const UserSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().min(1).required()
})

export const RegisterSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().min(1).required(),
    name : Joi.string().min(1).required()
})    