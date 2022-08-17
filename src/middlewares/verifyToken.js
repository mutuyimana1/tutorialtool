import TokenAuth from "../helpers/tokenAuth";
import UserInfos from "../models/users";

const isUserExist = async (req, res, next) => {
  try {
    const token = req.header("ex-auth-token");
    if (!token) {
      return res.status(400).json({ error: "no token provided" });
    }

    const data = TokenAuth.decodeToken(token);
    const { name } = data;
    if (name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid JWT token" });
    }
    if (name === "TokenWebExpired") {
      return res.status(400).json({ error: "JWT token expired " });
    }
    // console.log(data);
    req.user = data.user;
    const user = UserInfos.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        error: "user not found , you are not authorised",
      });
    }

    return next();
  } catch (error) {
    console.log(error);
  }
};
export default isUserExist;
