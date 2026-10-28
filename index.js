const express = require('express');
const app = express();
app.use(express.json());

// ============================================
// 👇 AMAN ULLAH KI DETAILS 👇
// ============================================
const DEVELOPER = {
  name: "Aman Ullah",
  whatsappChannel: "https://whatsapp.com/channel/0029Vb8Hsxs72WU1Dx57eu1q",
  youtubeChannel: "https://www.youtube.com/@amantechzone5911"
};

const API_NAME = "Aman Tech Zone - YouTube Thumbnail API";
const API_VERSION = "1.0.0";
// ============================================

// YouTube ID nikalne ka function
function getYouTubeID(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// 🏠 Root route
app.get('/', (req, res) => {
  res.json({
    status: "✅ API chal rahi hai",
    api: API_NAME,
    version: API_VERSION,
    developer: DEVELOPER,
    usage: "/api/thumbnail?url=YOUTUBE_URL",
    example: "/api/thumbnail?url=https://youtu.be/hpF974uANy8"
  });
});

// 🎬 Thumbnail endpoint
app.get('/api/thumbnail', (req, res) => {
  const { url } = req.query;

  const baseInfo = {
    developer: DEVELOPER,
    api: API_NAME
  };

  if (!url) {
    return res.status(400).json({
      ...baseInfo,
      error: 'URL required hai (e.g., ?url=https://youtu.be/VIDEO_ID)'
    });
  }

  const videoId = getYouTubeID(url);
  if (!videoId) {
    return res.status(400).json({
      ...baseInfo,
      error: 'Invalid YouTube URL'
    });
  }

  res.json({
    ...baseInfo,
    videoId: videoId,
    thumbnails: {
      sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    developer: DEVELOPER,
    error: 'Route nahi mila. Use karein: /api/thumbnail?url=YOUTUBE_URL'
  });
});

// ============================================
// 🚀 VERCEL + LOCAL — Dono ke liye
// ============================================
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log(`✅ ${DEVELOPER.name} ki API chal rahi hai!`);
    console.log(`🌐 http://localhost:3000`);
    console.log(`📺 YouTube: ${DEVELOPER.youtubeChannel}`);
    console.log(`💬 WhatsApp: ${DEVELOPER.whatsappChannel}`);
  });
}