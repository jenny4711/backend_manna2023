const db = require("../db");
const ExpressError = require("../expressError");

class History {
  constructor(id, user_id, msg) {
    this.id = id;
    this.user_id = user_id;
    this.msg = msg;
  }
  static async getAll(user_id) {
    const results = await db.query(`SELECT * FROM history WHERE user_id=$1`, [
      user_id,
    ]);
    const u = results.rows;
    const history = u.map((m) => new History(m.id, m.user_id, m.msg));
    if (!u) {
      throw new ExpressError("unknown user");
    }
    return history;
  }

  static async getById(id) {
    const results = await db.query(`SELECT * FROM history WHERE id=$1`, [id]);

    const h = results.rows[0];
    if (!h) {
      throw new ExpressError("Unknown record");
    }
    return new History(h.id, h.user_id, h.msg);
  }

  static async create(newUser_id, newMsg) {
    const result = await db.query(
      `INSERT INTO history (user_id,msg) 
    VALUES ($1,$2)
    RETURNING id,user_id,msg
    `,
      [newUser_id, newMsg]
    );
    const { id, user_id, msg } = result.rows[0];
    return new History(id, user_id, msg);
  }

  async delete() {
    await db.query(
      `DELETE FROM history 
  WHERE id =$1
  `,
      [this.id]
    );
  }

  async update() {
    const result = await db.query(
      `
  UPDATE history SET user_id=$1,msg=$2
  WHERE id=$3 
  `,
      [this.user_id, this.msg, this.id]
    );
  }
}

module.exports = History;
