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
    <div>
      <h1 className="text-4xl text-violet-700">Shorts</h1>

      {
        /*
        {videos.map(video => (
          <video key={video.id} width="320" height="240" controls>
            <source src="" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
        */
      }
    </div>
  )
}