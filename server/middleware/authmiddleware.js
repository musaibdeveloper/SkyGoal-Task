import jwt from "jsonwebtoken"
import config from "config"


function AuthMiddleware(req, res, next) {
    try {
        let tokencollect = req.headers["token"]
        console.log(tokencollect);
        if (!tokencollect) {
            return res.status(404).json({ msg: "Please provide a token" })
        }

        let jwtverify = jwt.verify(tokencollect, config.get("JWTKEY"));

        if (!jwtverify) {
             return res.status(500).json({ msg: "Time out... or Invalid Token." })
        }
        
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({error : error})
    }
}

export default AuthMiddleware;
