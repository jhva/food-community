// const { JWTStrategy, ExtractJWT } = require("passport-jwt").Strategy;
// const LocalStragegy = require("passport-local").Strategy;
// const { passportConfig } = require("../constant");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models");

// const passportLocalloginVerify = async (userEmail, password, done) => {
//   try {
//     const user = await User.findOne({ where: { email: userEmail } });

//     if (!user) {
//       done(null, false, { msg: "유저가 존재하지 않습니다" });
//       return;
//     }
//     const hash = await bcrypt.compare(password, user.password);

//     if (hash) {
//       done(null, user);
//       return;
//     }

//     done(null, false, { msg: "올바르지 않은 비밀번호 입니다." });
//   } catch (e) {
//     console.log(e);
//     done(e);
//   }
// };

// passport.use(
//   "signUp",
//   new LocalStragegy(passportConfig, passportLocalloginVerify)
// );
