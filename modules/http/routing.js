const URL = require('url');
const ReqError = require('../../util/ReqError');


module.exports = function (method, url) {

    const {kojo, logger} = this;

    // routing
    const {pathname} = URL.parse(url, true);
    const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');
    logger.debug('looking up route', method, trimmedPath);
    const [major, resID, minor] = trimmedPath.split('/');
    const routePattern = '/' + [major, resID ? ':id' : undefined, minor].filter(p => p).join('/');
    const routes = kojo.get('routes');

    // 404 pathname not found
    if (!routes[routePattern]) {
        throw new ReqError(404);
    }

    // 405 method not found (thus not allowed)
    if (routes[routePattern] && !routes[routePattern][method]) {
        throw new ReqError(405);
    }

    return routes[routePattern][method];
};
