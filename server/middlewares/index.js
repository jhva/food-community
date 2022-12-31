const LISTEN = (app) =>
  app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트 열림");
  });

module.exports = { LISTEN };
