import passportJwt from "passport-jwt";
import passport from "passport";
import prisma from "./prisma.js";
const { Strategy, ExtractJwt } = passportJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const verify = async (jwtPayload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: jwtPayload.username },
      include: { posts: { include: { comments: true } }, comments: true },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: "No user associated with token provided.",
      });
    }
  } catch (err) {
    return done(err);
  }
};

passport.use(new Strategy(options, verify));

export default passport;
