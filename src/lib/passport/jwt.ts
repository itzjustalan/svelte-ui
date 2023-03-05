import passport from "passport";
import { Strategy, ExtractJwt  } from "passport-jwt";
export const jwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: 'chooper-secret',
    issuer: 'cpdbytes.com',
}, (jwt, done) => {
    // verify jwt
    //https://www.passportjs.org/packages/passport-jwt/
    //
});
passport.use(jwtStrategy);