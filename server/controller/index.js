module.exports = {
  test: require("./user/test"),
  test2: require("./user/test2"),
  // naverlogin: require("./user/naverlogin"),

  kakaocallback: require("./user/kakaocallback"),
  authkakao: require("./user/authkakao"),
  signup: require("./user/signup"),
  logout: require("./user/logout"),
  login: require("./user/login"),
  // kakaocallback: require("./user/kakaocallback"),

  //board
  postBoard: require("./board/postBoard"),
  patchBoard: require("./board/patchBoard"),
  getBoard: require("./board/getBoard"),
  detailBoard: require("./board/detailBoard"),
  deleteBoard: require("./board/deleteBoard"),

  //comment
  postComment: require("./comment/postComment"),
  deleteComment: require("./comment/deleteComment"),

  //recruit
  postRecurit: require("./recruits/postRecurit"),
  deleteRecruit: require("./recruits/deleteRecruit"),
  getRecruit: require("./recruits/getRecruit"),
  patchRecruit: require("./recruits/patchRecruit.js"),

  //attend
  postAttend: require("./attend/postAttend"),

  // chat: require("./chat"),
};
