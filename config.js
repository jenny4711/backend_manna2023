const DB_URI = (process.env.NODE_ENV === "test")
? "postgresql:///manna_test"
: process.env.DATABASE_URL;

const SECRET_KEY = process.env.SECRET_KEY || "jenny4711";
const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "manna_test"
      : process.env.DATABASE_URL || "manna";
}

const BCRYPT_WORK_FACTOR = 12;

module.exports={
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,PORT,
  getDatabaseUri
}