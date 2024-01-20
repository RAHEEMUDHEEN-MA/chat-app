const express=require('express')
const test = require('../controllers/test')
const SignUp = require('../controllers/SignUp')
const tester = require('../controllers/ok')
const FindUser = require('../controllers/FindUser')
const SendFriendRequest = require('../controllers/SendFriendRequest')
const ViewFriendRequest = require('../controllers/ViewFriendRequest')
const AcceptFriendRequest = require('../controllers/AcceptFriendRequest')

const appRouter=express.Router()

appRouter.route('/test').post(test)
appRouter.route('/ok').get(tester) 
appRouter.route('/signup').post(SignUp)
appRouter.route('/search').get(FindUser)
appRouter.route('/:id/sendfriendrequest').post(SendFriendRequest)
appRouter.route('/:id/viewfriendrequest').get(ViewFriendRequest)
appRouter.route('/:rid/acceptrequest').put(AcceptFriendRequest)


module.exports=appRouter