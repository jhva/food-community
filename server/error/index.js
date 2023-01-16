const ERROR = (status, msg, res, err) => {
  switch (status) {
    case 500:
      res.status(500).json({
        msg: "server err",
        status,
      });
      break;
    case 419:
      res.status(419).json({
        msg: msg,
        status,
      });
      break;
    case 400:
      res.status(400).json({
        msg: msg,
        status,
      });
      break;
    case 403:
      res.status(403).json({
        msg: msg,
        status,
      });
      break;
    default:
      break;
  }
};

module.exports = { ERROR };
