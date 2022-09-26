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
  const [selectedVideoId, setSelectedVideoId] = useState("");

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

    await axios.post("http://localhost:3333/uploadVideo", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Upload feito com sucesso! Recarregue a página para ver o novo vídeo!");
  }

  async function handleAddThumbnail(event: FormEvent) {
    event.preventDefault();

    if(selectedVideoId === "") {
      return alert("Escolha um vídeo para a thumbnail!");
    }

    const form = document.querySelector("#addThumbnail");
    const formData = new FormData(form as HTMLFormElement);

    await axios.post(`http://localhost:3333/video/${selectedVideoId}/thumbnail`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Thumbnail adicionada com sucesso! Recarregue a página para ver a nova thumb!");
  }

  return (
    <div className="max-w-7xl w-full mx-auto">
      <h1 className="text-4xl text-violet-700 mt-6">Shorts</h1>

      <form id="uploadVideo" onSubmit={handleUploadVideo} method="post" encType="multipart/form-data">
        <div className="mt-10 flex flex-col gap-2">
          <label htmlFor="video" className="text-2xl text-gray-800">Adicionar novo vídeo</label>
          <input type="file" name="video" id="video" />
        </div>
        <button type="submit" className="flex items-center justify-center py-2 px-4 bg-violet-800 text-white mt-6 rounded-md">
          Enviar 
        </button>
      </form>

      <form id="addThumbnail" onSubmit={handleAddThumbnail} method="post" encType="multipart/form-data">
        <div className="mt-10 flex flex-col gap-2">
          <label htmlFor="thumbnail" className="text-2xl text-gray-800">Adicionar thumbnail</label>
          <input type="file" name="thumbnail" id="thumbnail" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {videos.filter(video => video.thumbnail_name === null).map(video => (
            <div key={video.id} className="flex gap-2 items-center">
              <label htmlFor="selectVideo" className="text-lg text-gray-700">{video.video_name}</label>
              <input type="radio" name="selectVideo" value={video.id} id="selectVideo" onChange={(e) => setSelectedVideoId(e.target.value)} />
            </div>
          ))}
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