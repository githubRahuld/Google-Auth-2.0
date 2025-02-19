import passport from 'passport'
import GoogleStrategy,{Strategy} from 'passport-google-oauth20'

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback:true
      },
      function(request,accessToken,refreshToken,profile,done){
        return done(null,profile);
      }
    ));

passport.serializeUser(function(user,done){
    done(null,user);
})
passport.deserializeUser(function(user,done){
    done(null,user);
})

export default passport;