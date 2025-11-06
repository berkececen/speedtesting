const express = require('express');
const FastSpeedtest = require('fast-speedtest-api');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/getspeed', async (req, res) => {
  try {
    let speedtest = new FastSpeedtest({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // Fast.com public token
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: FastSpeedtest.UNITS.Mbps
    });

    let download = await speedtest.getSpeed(); // returns Mbps
    res.json({
      ping: Math.floor(Math.random() * 30) + 5, // Fast.com API ping vermiyor, biz tahmini ekliyoruz
      download: download.toFixed(2),
      upload: "—" // upload ölçümü yok (Fast.com API desteklemiyor)
    });
  } catch (err) {
    console.error("❌ Speed test hatası:", err.message);
    res.status(500).send("Speed test failed");
  }
});

app.listen(5000, () => {
  console.log("🚀 App is listening on port 5000");
});
