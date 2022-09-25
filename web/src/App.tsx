import axios from "axios";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  created_at: Date;
  video_name: string;
  thumbnail_name: string;
}

export function App() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await axios.get("http://localhost:3333/videos");
      
      setVideos(response.data);
    }

    loadData();
  }, [])

  return (
    <div className="max-w-7xl w-full mx-auto">
      <h1 className="text-4xl text-violet-700 mt-6">Shorts</h1>

      <div className="mt-8">
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