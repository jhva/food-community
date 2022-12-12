const User = require("../models/user");

async function login(req, res, next) {}

async function signUp(req, res, next) {}
async function checkEmail(req, res, next) {}
async function checkNickname(req, res, next) {}

module.exports = { login, checkNickname, checkEmail, signUp };
