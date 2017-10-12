const Router = require('koa-router');
const router = new Router();
const private = require('./routes/private');
const authCtrl = require('./controllers/').authCtrl;

router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signUp);

router.get('/', private, async (ctx, next) => {
  ctx.body = 'Test private route';
});
module.exports = router;
