import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/userAuth/google/callback',
            scope: ["profile", "email"]
        },
        function(accessToken, refreshToken, profile, callback){
            callback(null, profile)
        }
    )
)

passport.serializeUser((user, done)=> {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})


