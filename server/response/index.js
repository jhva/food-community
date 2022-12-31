const RES = (status, msg, res) => {
  switch (status) {
    case 200:
      res.status(200).json({
        msg: msg,
        status,
      });
      break;

    default:
      break;
  }
};

module.exports = { RES };
