import express from "express";
import multer from "multer";
import path from "path";

const app = express();

app.use(express.json());

const videoStorage = multer.diskStorage({
  destination: 'videos', // destination to store the video
  filename: (request, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname)
    )
  } // filename with the name of the file plus the timestamp
});

const videoUpload = multer({
  storage: videoStorage, 
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB
  },
  fileFilter(request, file, cb) {
    // upload only videos with mp4 or mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
      return cb(new Error('Please upload a video with mp4 or mkv format.'))
    }
    cb(null, true);
  }
});

app.post("/uploadVideo", videoUpload.single('video'), (request, response) => {
  response.json(request.file)
}, (error, request, response, next) => {
  response.status(400).json({ error: error.message })
})

app.listen(3333, () => console.log("Server is running."));