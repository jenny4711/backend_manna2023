const DB_URI = (process.env.NODE_ENV === "test")
? "postgresql:///manna_test"
:"postgresql:///manna";

const SECRET_KEY = process.env.SECRET_KEY || "secret";
const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 12;

module.exports={
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,PORT
}