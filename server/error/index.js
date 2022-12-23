const ERROR = (status, err, res) => {
  switch (status) {
    case 500:
      console.error(err);
      res.status(500).json({
        msg: "server err",
        code: 500,
      });
      break;
    default:
      break;
  }
};

module.exports = { ERROR };
