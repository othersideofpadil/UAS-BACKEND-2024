// import Model Patient
const Patient = require("../models/Patient")
const { request } = require ("express")

// buat class PatientController
class PatientController {
  // buat fungsi
  // menambahkan keyword async
  async index(req, res) {
    // menampilkan data students
    const patient = await Patient.all();
    const data = {
      message: "Menampilkan semua data Pasien Covid",
      data: patient,
    };

    res.status(200).json(data);
  }

  async store(req, res) {
    //destructing object req.body
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;
    // jika data undefined maka kirim response error
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: "Semua data harus dikirim",
      };

      return res.status(422).json(data);
    }
    // menambahkan data
    const patient = await Patient.create(req.body);

    const data = {
      message: `Berhasil menambahkan ${name} sebagai data pasien baru`,
      data: patient,
    };

    res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    // mencari id student sesuai dengan yg ingin diupdate
    const patients = await Patient.find(id);

    if (patients) {
      // melakukan update data berdasarkan id
      const patients = await Patient.update(id, req.body);
      const data = {
        message: `Berhasil mengedit data pasien covid`,
        data: patients,
      };

      res.status(200), res.json(data);
    } else {
      // kirim data tidak ada
      const data = {
        message: "Data pasien covid tidak ditemukan",
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    // mencari id yang ingin dihapus jika ada maka akan kirim datanya, jika tidak data tidak ada
    const patients = await Patient.find(id);

    if (patients) {
      // hapus data
      await Patient.delete(id);
      const data = {
        message: `Berhasil menghapus data pasien covid`,
      };

      res.status(200).json(data);
    } else {
      // data tidak ada
      const data = {
        message: "Data tidak ditemukan",
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const patients = await Patient.find(id);

    if (patients) {
      const data = {
        message: "Menampilkan detail data pasien covid",
        data: patients,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Data pasien covid tidak ada",
      };

      res.status(404).json(data);
    }
  }

  // mencari pasien berdasarkan nama
  async search(req, res) {
    const name = req.params.name;
    const patients = await Patient.find({name: name});
    if (patients) {
      const data = {
        message: "Menampilkan detail data pasien covid",
        data: patients,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Data pasien covid tidak ada",
      };

      res.status(404).json(data);
    }
  }

  // menampilkan data positive berdasarkan status
  async positive(req, res) {
    const patients = await Patient.findByStatus("positive");
    if (patients) {
      const data = {
        message: "Menampilkan data positive pasien covid",
        data: patients,
      };
      res.status(200).json(data);
    } else {
      // data tidak ada dan memberikan respon 404
      const data = {
        message: "Data pasien covid tidak ada",
      };

      res.status(404).json(data);
    }
  }

  // menampilkan data negative berdasarkan status
  async recovered(req, res) {
    const patients = await Patient.findByStatus("negative");
    if (patients) {
      const data = {
        message: "Menampilkan data negative pasien covid",
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Data pasien covid tidak ada",
      };
      // data tidak ada dan memberikan respon 404
      res.status(404).json(data);
    }
  }

  // menacari data death berdasarkan status
  async dead(req, res) {
    const patients = await Patient.findByStatus("dead");
    if (patients) {
      const data = {
        message: "Menampilkan data kematian pasien covid",
        data: patients,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Data pasien covid tidak ditemukan",
      };
      // data tidak ada dan memberikan respon 404
      res.status(404).json(data);
    }
  }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
