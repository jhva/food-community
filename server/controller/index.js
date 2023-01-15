module.exports = {
  test2: require("./user/test2"),
  test: require("./user/test"),
  naverlogin: require("./user/naverlogin"),

  authentication: require("./user/authentication"),

  kakaocallback: require("./user/kakaocallback"),
  authkakao: require("./user/authkakao"),
  signup: require("./user/signup"),
  logout: require("./user/logout"),
  login: require("./user/login"),
  // kakaocallback: require("./user/kakaocallback"),

  //board
  detailBoard: require("./board/detailBoard"),
  deleteBoard: require("./board/deleteBoard"),
  patchBoard: require("./board/patchBoard"),
  postBoard: require("./board/postBoard"),
  getBoard: require("./board/getBoard"),

  //comment
  deleteComment: require("./comment/deleteComment"),
  postComment: require("./comment/postComment"),

  //recruit
  patchRecruit: require("./recruits/patchRecruit.js"),
  deleteRecruit: require("./recruits/deleteRecruit"),
  postRecurit: require("./recruits/postRecurit"),
  getRecruit: require("./recruits/getRecruit"),

  //attend
  postAttend: require("./attend/postAttend"),

  // chat
  postChat: require("./chat/postChat"),
  getRooms: require("./chat/getRooms"),
  getMsgList: require("./chat/getMsgList"),

  //push
  push: require("./alarm"),
};
