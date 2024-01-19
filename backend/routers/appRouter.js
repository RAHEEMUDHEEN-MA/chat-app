const express=require('express')
const test = require('../controllers/test')
const SignUp = require('../controllers/SignUp')
const tester = require('../controllers/ok')

const appRouter=express.Router()

appRouter.route('/test').post(test)
appRouter.route('/ok').get(tester) 
appRouter.route('/signup').get(SignUp)


module.exports=appRouter