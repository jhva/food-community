module.exports = async (req, res, next) => {
  res.json({
    msg: "토큰이 만료되어 로그아웃됩니다.",
  });
};
