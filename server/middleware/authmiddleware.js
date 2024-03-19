import jwt from "jsonwebtoken"
import config from "config"


function AuthMiddleware(req, res, next) {
    try {
        let tokencollect = req.header["access-token"]
        if (!tokencollect) {
            return res.status(404).json({ msg: "Please provide a token" })
        }

        let jwtverify = jwt.verify(tokencollect, config.get("JWTKEY"));

        if (!jwtverify) {
            res.status(500).json({ msg: "Time out... or Invalid Token." })
        }

        console.log(jwtverify);

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Token Expired" })
    }
}

export default AuthMiddleware;
