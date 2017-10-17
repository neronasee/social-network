const Router = require('koa-router');
const router = new Router();
const private = require('./routes/private');
const authCtrl = require('./controllers/').authCtrl;
const usersCtrl = require('./controllers/').usersCtrl;
const groupsCtrl = require('./controllers/').groupsCtrl;

router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signUp);

router.get('/users', usersCtrl.getAll);
router.get('/users/:id', usersCtrl.getSingle);
router.patch('/users/:id', usersCtrl.update);
router.delete('/users/:id', usersCtrl.delete);

router.get('/groups', groupsCtrl.getAll);
router.get('/groups/:id', groupsCtrl.getSingle);
router.post('/groups', groupsCtrl.create);
router.patch('/groups/:id', groupsCtrl.update);
router.delete('/groups/:id', groupsCtrl.delete);

router.get('/users/:id/groups', usersCtrl.getUserGroups);
router.get('/groups/:id/users', groupsCtrl.getUsers);

router.put('/groups/:groupId/users/:userId', groupsCtrl.addUserToGroup);
router.delete('/groups/:groupId/users/:userId', groupsCtrl.deleteUserFromGroup);
// DELETE users/:userId/groups/:groupId -> unmember (protected)
// TODO: delete test route
// TODO: create secure route for single user requests
router.get('/', private, async (ctx, next) => {
  ctx.body = 'Test private route';
});
module.exports = router;
