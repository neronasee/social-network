exports.init = app =>
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      if (e.status) {
        ctx.status = e.status;
        ctx.body = { error: e.message };
      } else {
        ctx.body = { error: 'Error 500' };
        ctx.status = 500;
        console.error(e.message, e.stack);
      }
    }
  });
