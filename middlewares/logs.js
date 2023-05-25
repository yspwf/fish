const logs =  async (ctx, next) => {
    console.log('logs');
    await next();
}

module.exports = logs;