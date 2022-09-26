import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

interface Video {
  id: string;
  created_at: Date;
  video_name: string;
  thumbnail_name: string;
}

export function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadData() {
      const response = await axios.get("http://localhost:3333/videos");
      
      setVideos(response.data);
    }

    loadData();
  }, []);

  async function handleUploadVideo(event: FormEvent) {
    event.preventDefault();
    const form = document.querySelector("#uploadVideo");
    const formData = new FormData(form as HTMLFormElement);

    const response = await axios.post("http://localhost:3333/uploadVideo", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    console.log(response);
  }

  async function handleAddThumbnail(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="max-w-7xl w-full mx-auto">
      <h1 className="text-4xl text-violet-700 mt-6">Shorts</h1>

      <form id="uploadVideo" onSubmit={handleUploadVideo} method="post" encType="multipart/form-data">
        <div className="mt-10 flex flex-col gap-2">
          <label htmlFor="video" className="text-2xl text-gray-800">Adicionar novo vídeo</label>
          <input type="file" name="video" id="video" onChange={(e) => setSelectedFile(e.target.files![0])} />
        </div>
        <button type="submit" className="flex items-center justify-center py-2 px-4 bg-violet-800 text-white mt-6 rounded-md">
          Enviar 
        </button>
      </form>

      <div className="mt-8 flex gap-10">
        {videos.map(video => (
          <div key={video.id} className="max-w-xs w-full max-h-60 h-full">
            <video poster={`http://localhost:3333/static-thumbnails/${video.thumbnail_name}`} controls>
              <source src={`http://localhost:3333/static-videos/${video.video_name}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
        
    </div>
  )
}