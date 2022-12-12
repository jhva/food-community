const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const User = require("../models/user");
const passport = require("passport");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

//이메일 중복검사
router.post("/check-email");

//닉네임 중복검사
router.post("/check-nickname");

// // 회원가입

//로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("일반사용자", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({
        result: false,
        msg: "사용자를 찾을 수 없습니다",
        status: 401,
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({
        result: true,
        msg: "success",
        status: 200,
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

//로그아웃
router.post("/logout");

// //카카오 로그인
// router.get("/kakao", passport.authenticate("kakao"));

// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", {
//     failureRedirect: "/",
//   }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// //네이버 로그인
// router.get("/naverlogin", passport.authenticate("naver"));

// router.get(
//   "/naver/callback",
//   passport.authenticate("naver", {
//     failureRedirect: "/",
//   }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

module.exports = router;
