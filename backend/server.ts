import { PrismaClient } from "@prisma/client";
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

const thumbnailStorage = multer.diskStorage({
  destination: 'thumbnails',
  filename: (request, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname)
    )
  }
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

const thumbnailUpload = multer({
  storage: thumbnailStorage,
  limits: {
    fileSize: 1024 * 1024 * 1 // 1 MB
  },
  fileFilter(request, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) { 
      return cb(new Error('Please upload a video with mp4 or mkv format.'))
    }
    cb(null, true);
  }
});

const prisma = new PrismaClient();

app.post("/uploadVideo", videoUpload.single('video'), async (request, response) => {
  const short = await prisma.short.create({
    data: {
      video_name: request!.file!.path,
    }
  })

  return response.json(short);
}, (error, request, response, next) => {
  response.status(400).json({ error: error.message })
});

app.post("/video/:id/thumbnail", thumbnailUpload.single('thumbnail'), async (request, response) => {
  const { id } = request.params;

  const shortUpdated = await prisma.short.update({
    where: {
      id
    },
    data: {
      thumbnail_name: request!.file!.path
    }
  });

  return response.json(shortUpdated);
});

app.listen(3333, () => console.log("Server is running."));