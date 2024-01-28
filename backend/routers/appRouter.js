const express=require('express')
const test = require('../controllers/test')
const SignUp = require('../controllers/SignUp')
const tester = require('../controllers/ok')
const FindUser = require('../controllers/FindUser')
const SendFriendRequest = require('../controllers/SendFriendRequest')
const ViewFriendRequest = require('../controllers/ViewFriendRequest')
const AcceptFriendRequest = require('../controllers/AcceptFriendRequest')
const Login = require('../controllers/Login')
const ViewConnection = require('../controllers/ViewConnections')
const ViewConnections = require('../controllers/ViewConnections')
const clearDB = require('../controllers/danger/clearDB')
const RejectFriendRequest = require('../controllers/RejectFriendRequest')
const FindUserById = require('../controllers/FindUserByID')
const UnFriend = require('../controllers/UnFriend')
const SendMessage = require('../controllers/SendMessage')
const LoadChatHistory = require('../controllers/LoadchatHistory.js')

const appRouter=express.Router()

appRouter.route('/test').post(test)
appRouter.route('/ok').get(tester) 
  
appRouter.route('/cleardb').delete(clearDB)

appRouter.route('/signup').post(SignUp)
appRouter.route('/login').post(Login) 
appRouter.route('/find/:id').get(FindUserById)
appRouter.route('/search/:mobile').get(FindUser)
appRouter.route('/chatlist/:id').get(ViewConnections)
appRouter.route('/sendfriendrequest').post(SendFriendRequest)
appRouter.route('/:id/viewfriendrequest').get(ViewFriendRequest)
appRouter.route('/:rid/acceptrequest').put(AcceptFriendRequest)
appRouter.route('/:rid/rejectrequest').put(RejectFriendRequest)
appRouter.route('/unfriend').put(UnFriend)
appRouter.route('/sendmessage').post(SendMessage)
appRouter.route('/chathistory').post(LoadChatHistory)



module.exports=appRouter