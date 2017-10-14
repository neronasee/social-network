const Router = require('koa-router');
const router = new Router();
const private = require('./routes/private');
const authCtrl = require('./controllers/').authCtrl;
const usersCtrl = require('./controllers/').usersCtrl;

router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signUp);

router.get('/users', usersCtrl.getAll);
router.get('/users/:id', usersCtrl.getSingle);
router.patch('/users/:id', usersCtrl.update);
router.delete('/users/:id', usersCtrl.delete);
// TODO: delete test route
// TODO: create secure route for single user requests
router.get('/', private, async (ctx, next) => {
  ctx.body = 'Test private route';
});
module.exports = router;
