const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    var authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json({error: 'No token provided'});
    
    var parts = authHeader.split(' ');
    if(!parts.length === 2)
        return res.status(401).json({error: 'Token error'});

    const [schema, token] = parts;

    if(schema.toLowerCase() != 'bearer')
        return res.status(401).json({error: 'Token malformatted'});

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error)
            return res.status(401).json({error: 'Token invalid'});

        req.userId = decoded.id;
        return next();
    });
    
}