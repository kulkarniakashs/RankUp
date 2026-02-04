import { useEffect, useState } from "react";
import type { Module } from "../../types/module";
import type { Video } from "../../types/video";
import { videosApi } from "../../api/videoApi";
import VideoRow from "./VideoRow";

export default function ModuleAccordion({
  module,
  courseId,
  locked,
}: {
  module: Module;
  courseId: string;
  locked: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    videosApi
      .byModule(module.id)
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [open, module.id]);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-4">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex flex-col items-start">
          <div className="font-semibold text-gray-900">{module.title}</div>
          {module.description && (
            <div className="text-sm text-gray-600 mt-1 line-clamp-1">
              {module.description}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500">{open ? "▲" : "▼"}</div>
      </button>

      {open && (
        <div className="mt-4 space-y-2">
          {loading ? (
            <div className="text-sm text-gray-500">Loading videos...</div>
          ) : videos.length === 0 ? (
            <div className="text-sm text-gray-500">No videos yet</div>
          ) : (
            videos.map((v) => (
              <VideoRow key={v.id} video={v} courseId={courseId} locked={locked} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
