const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../models/user.model");

/**
 * GOOGLE STRATEGY
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            provider: "google",
            googleId: profile.id
          });
        } else {
          user.googleId = profile.id;
          user.provider = "google";

          await user.save();
        }

        done(null, user);

      } catch (error) {
        done(error, null);
      }
    }
  )
);

/**
 * GITHUB STRATEGY
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value;

        /**
         * GitHub sometimes does not provide email
         */
        if (!email) {
          email = `${profile.username}@github.com`;
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.username,
            email,
            provider: "github",
            githubId: profile.id
          });
        } else {
          user.githubId = profile.id;
          user.provider = "github";

          await user.save();
        }

        done(null, user);

      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;