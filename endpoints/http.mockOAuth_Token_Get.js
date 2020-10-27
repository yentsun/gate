const { bonner } = require('@venture-api/fixtures/fixtures/player');


module.exports = async (gate, logger) => {

    const { HTTP } = gate.services;

    HTTP.addRoute({

        method: 'POST',
        pathname: '/mock-oauth-token'

    }, async (req) => {

        const { code } = req.body;

        logger.debug('issuing token for', code);
        return {
            "access_token":"MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3",
            "token_type":"bearer",
            "expires_in":3600,
            "refresh_token":"IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk",
            "scope":"create",
            "info": { displayName: bonner.name, username: 'bonner', emails: [ bonner.email ]}
        };
    });

};