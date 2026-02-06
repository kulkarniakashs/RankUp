import { useSearchParams, useNavigate } from "react-router-dom";
import EmptyState from "../components/students/EmptyState";
import { useEffect, useState } from "react";
import type { Video } from "../types/video";

export default function Player({setVideoDetailsById}:{ setVideoDetailsById : (videoId: string, setVideo: React.Dispatch<React.SetStateAction<Video | null>>)=> Promise<void>}) {
  const [sp] = useSearchParams();
  const videoId = sp.get("videoId");
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(()=>{
    setVideoDetailsById(videoId || "",setVideo);
  },[]);

  useEffect(()=>{
    console.log(video);
  },[video])

  if (!video) {
    return (
      <EmptyState
        title="No video selected"
        subtitle="Open a video from the course modules."
        action={
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold"
          >
            Back to course
          </button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl bg-white border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          ← Back
        </button>
        <div className="text-sm text-gray-500">Video ID: {videoId}</div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="font-semibold text-gray-900">{video?.title}</div>
          <div className="text-sm text-gray-600">{video?.description}</div>
        </div>

        <div className="aspect-video bg-black/90 flex items-center justify-center text-white">
          <video className=" bg-black/90 flex items-center justify-center text-white" src={`${import.meta.env.VITE_APP_R2}/${video?.rawObjectKey}`} height={1080} width={1920} controls autoPlay></video>
        </div>

      </div>
    </div>
  );
}
