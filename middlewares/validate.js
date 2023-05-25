const validate =  async (ctx, next) => {
    console.log('validate');
    await next();
}

module.exports = validate;