// import database
const db = require ("../config/database")

// membuat class Patient
class Patient {
  // buat fungsi
  static all() {
    // return Promise sebagai Asynchronus
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      db.query(sql, (sql, results) => {
        resolve(results);
      });
    });
  }

  // mencari patients berdasarkan id
  static find(id) {
    // melakukan promise select by id
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results[0]);
      });
    });
  }

  static async create(data) {
    // melakukan insert data ke database
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    // promise 2
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // melakukan update dengan asyncronus berdasarkan id
  static async update(id, data) {
    // update data
    await new Promise((resolve, reject) => {
      // melakukan query untuk update data
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // select data by id
    const patient = await this.find(id);
    return patient;
  }

  //melakukan delete berdasarkan id
  static async delete(id) {
    // query delete
    return new Promise((resolve, reject) => {
      // query sql
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  //menampilkan data berdasarkan id
  static async show(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE id = ${id} `;
      db.query(sql, id, (err, results) => {
        // mendestructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // mencari pasien berdasarkan nama
  static async search(name) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE name = ${name}`;
      db.query(sql, name,(err, results))
      const [patient] = results
      resolve(patient);
    })
  }

  // mendapatkan data pasien covid berdasarkan status
  static findByStatus(data) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE status = ?`;
      db.query(sql, data, (sql, results) => {
        resolve(results);
      });
    });
  }
}


// export class Patient
module.exports = Patient;
