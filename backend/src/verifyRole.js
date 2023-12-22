const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not Authenticated");
    }
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin || req.user.isReporter) {
            next();
        } else {
            res.status(403).json("You are not Allowed");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are Not Admin")
        }
    });
};

const verifyTokenAndReporter = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isReporter) {
            next();
        } else {
            res.status(403).json("You are Not Reporter")
        }
    });
};


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndReporter
}