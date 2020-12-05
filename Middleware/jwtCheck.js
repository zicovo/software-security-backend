const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-rlt7-zh1.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://software-sec-zico-api',
  issuer: 'https://dev-rlt7-zh1.eu.auth0.com/',
  algorithms: ['RS256']
});

module.exports = jwtCheck

