import { check } from "express-validator";

export const RegisterSchema=[
    check('name').trim().isAlpha().withMessage("Name should be ALphabet only"),
    check('username','username is required').exists().
    isAlphanumeric().withMessage('username should be alphanumeraic character only').trim().isLength({min:6,max:32}),
    check('password','Password is required').isLength({min:6,max:10}),
    check('email','Email is required').exists().isEmail(),
]