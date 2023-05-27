const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static async authenticate(email, password) {
    const result = await db.query(
      `SELECT email, password
       FROM users
       WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new ExpressError("Invalid email/password");
  }

  static async register({ email, password }) {
    const duplicateCheck = await db.query(
      `SELECT email
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (email, password)
       VALUES ($1, $2)
       RETURNING email`,
      [email, hashedPassword]
    );

    return result.rows[0];
  }

  static async findAll() {
    const result = await db.query(`SELECT  *  FROM users`);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    const user = result.rows[0];
    if (!user) {
      throw new ExpressError("Unknown record");
    }
    return user;
  }

  static async getByEmail(email) {
    const result = await db.query(`SELECT id, email FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) {
      throw new ExpressError("Unknown record");
    }
    return user;
  }
  
  
  




  static async deleteById(id) {
    const result = await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    const user = result.rows[0];
    if (!user) {
      throw new ExpressError(`No id: ${id}`);
    }
  }

  static async update(email, password) {
    const result = await db.query(
      "UPDATE users SET email=$1,password=$2 WHERE id=$3 RETURNING *",
      [email, password, id]
    );
  }
}

module.exports = User;
