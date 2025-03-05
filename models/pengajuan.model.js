const mongoose = require('mongoose');

const pengajuanSchema = mongoose.Schema({
  nama: String,
  nik: String,
  tanggalLahir: String,
  statusPernikahan: String,
  dataPasangan: String,
  dealer: String,
  merkKendaraan: String,
  modelKendaraan: String,
  tipeKendaraan: String,
  warnaKendaraan: String,
  hargaKendaraan: Number,
  asuransi: String,
  downPayment: Number,
  lamaKredit: Number,
  angsuranPerBulan: Number,
  status: {
    type: String,
    enum: ['pending', 'approved', 'reject'],
    default: 'pending',
  },
  dokumenTTD: String,
});

module.exports = mongoose.model('Pengajuan', pengajuanSchema);
