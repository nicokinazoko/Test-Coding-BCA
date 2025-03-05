const express = require('express');
const router = express.Router();
const PengajuanModel = require('../models/pengajuan.model');

// endpoint pengajuan
router.post('/', async (req, res) => {
  try {
    const pengajuan = await PengajuanModel.create(req.body);
    res
      .status(201)
      .json({ message: 'pengajuan berhasil dibuat', data: pengajuan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// endpoint ambil semua pengajuan
router.get('/', async (req, res) => {
  try {
    const pengajuanList = await PengajuanModel.find();
    res.json(pengajuanList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint approve pengajuan
router.put('/approve/:id', async (req, res) => {
  try {
    await PengajuanModel.findByIdAndUpdate(req.params.id, {
      status: 'approved',
    });
    res.json({ message: 'pengajuan disetujui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint reject pengajuan
router.put('/reject/:id', async (req, res) => {
  try {
    await PengajuanModel.findByIdAndUpdate(req.params.id, {
      status: 'rejected',
    });
    res.json({ message: 'pengajuan ditolak' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/ttd/:id', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging
    const { field, ttdURL } = req.body;

    if (!field || !ttdURL) {
      return res
        .status(400)
        .json({ success: false, message: 'Field dan TTD URL diperlukan' });
    }

    const updatedData = await PengajuanModel.findByIdAndUpdate(
      req.params.id,
      { [field]: ttdURL },
      { new: true }
    );

    res.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
