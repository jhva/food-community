let options = {
  host: process.env.HOST,
  port: process.env.MYSQLPORT,
  user: process.env.USERID,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

module.exports = { options };
