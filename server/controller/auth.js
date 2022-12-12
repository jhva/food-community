const { refreshToken, accessToken } = require("../jwt/jwt");
const User = require("../models/user");
const passport = require("passport");
const express = require("express");
const bcrypt = require("bcrypt");

async function login(req, res, next) {}

async function signUp(req, res, next) {
  const { email, phoneNumber, nickname, password, isMarketing } = req.body;
  try {
    let generateAccessTokens = accessToken(email);
    let generateRefreshToken = refreshToken(email);
    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      phoneNumber,
      nickname,
      password: hash,
      isMarketing,
      accessToken: generateAccessTokens,
      refreshToken: generateRefreshToken,
    });

    res.status(200).json({
      code: 200,
      msg: "success",
    });
  } catch (e) {
    console.log(e);
  }
}
async function checkEmail(req, res, next) {}
async function checkNickname(req, res, next) {}

module.exports = { login, checkNickname, checkEmail, signUp };
