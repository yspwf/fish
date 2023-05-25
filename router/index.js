module.exports = ({Router, Middlewares, Controllers}) => {
    const { logs } = Middlewares;
    Router.get('/', logs, Controllers.Home.index);

    Router.get('/:id/article', logs, Controllers.Home.article);

    return Router;

}