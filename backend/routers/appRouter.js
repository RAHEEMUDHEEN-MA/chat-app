const express=require('express')
const test = require('../controllers/test')
const SignUp = require('../controllers/SignUp')
const tester = require('../controllers/ok')
const FindUser = require('../controllers/FindUser')
const SendFriendRequest = require('../controllers/SendFriendRequest')
const ViewFriendRequest = require('../controllers/ViewFriendRequest')
const AcceptFriendRequest = require('../controllers/AcceptFriendRequest')
const Login = require('../controllers/Login')
// const clearDB = require('../controllers/danger/clearDB')

const appRouter=express.Router()

appRouter.route('/test').post(test)
appRouter.route('/ok').get(tester) 

// appRouter.route('/cleardb').delete(clearDB)

appRouter.route('/signup').post(SignUp)
appRouter.route('/login').post(Login)
appRouter.route('/search').get(FindUser)
appRouter.route('/:id/sendfriendrequest').post(SendFriendRequest)
appRouter.route('/:id/viewfriendrequest').get(ViewFriendRequest)
appRouter.route('/:rid/acceptrequest').put(AcceptFriendRequest)



module.exports=appRouter