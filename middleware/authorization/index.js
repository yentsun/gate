const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const ReqError = require('../../util/ReqError');


module.exports = (moduleName) => {

    const authorize = require(`./${moduleName}.js`);
    const verify = promisify(jwt.verify);

    return async (req, res, next) => {


        // verify token

        const {token} = req;
        if (!token)
            throw new ReqError(400, 'authorization token missing');

        const {jwt: {secret}} = req.app.get('config');
        req.tokenPayload = await verify(token, secret);


        // call auth module

        req[moduleName] = await authorize(req);
        next()
    }
};
