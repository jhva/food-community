const dotenv = require("dotenv");
const redis = require("redis");

dotenv.config(); // env환경변수 파일 가져오기

//* Redis 연결
// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
//   legacyMode: true, // 반드시 설정 !!
// }); // legacy 모드 반드시 설정 !!

const redisClient = redis.createClient({
  legacyMode: true,
});
redisClient.on("connect", () => {
  console.info("redis 연동 완료");
});
redisClient.on("error", (err) => {
  console.error("레디스 연결 끊김", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
// 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용

module.exports = {
  redisClient,
};
