// const User = require("../models/user");
// const bcrypt = require("bcrypt");

// async function login(req, res, next) {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ status: 400, msg: "입력을 모두 완료해주세요" });
//   }
//   try {
//     const isEqulsEmail = await User.findOne({ where: { email } });

//     if (isEqulsEmail) {
//       const isEqulsPw = await bcrypt.compare(password, isEqulsEmail.password);
//       if (isEqulsPw) {
//         let generateAccessTokens = accessToken(email);
//         let generateRefreshToken = refreshToken(email);
//         await User.update(
//           {
//             accessToken: generateAccessTokens,
//             refreshToken: generateRefreshToken,
//           },
//           { where: { email } }
//         );
//         return res
//           .cookie("secret", generateAccessTokens)
//           .status(200)
//           .json({ msg: "success", status: 200, data: [isEqulsEmail] });
//       } else {
//         return res.status(400).json({
//           msg: "로그인 실패하였습니다",
//           status: 400,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         msg: "등록된 이메일이 없습니다",
//         status: 400,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// // async function signUp(req, res, next) {
// //   const { username, email, phoneNumber, nickname, password, isMarketing } =
// //     req.body;
// //   try {
// //     const hash = await bcrypt.hash(password, 10);

// //     await User.create({
// //       email,
// //       username,
// //       phoneNumber,
// //       nickname,
// //       password: hash,
// //       isMarketing,
// //     });

// //     res.status(200).json({
// //       status: 200,
// //       msg: "signUp success",
// //     });
// //   } catch (e) {
// //     console.log(e);
// //   }
// // }
// // async function logout(req, res, next) {
// //   return res
// //     .cookie("secret", "")
// //     .status(200)
// //     .json({ status: 200, msg: "logout success" });
// // }
// async function kakaocallback(req, res, next) {}
// async function checkEmail(req, res, next) {}
// async function checkNickname(req, res, next) {}
// async function naverlogin(req, res, next) {}

// module.exports = {
//   login,
//   checkNickname,
//   checkEmail,
//   signUp,
//   kakaocallback,
//   naverlogin,
//   logout,
//   test,
// };
