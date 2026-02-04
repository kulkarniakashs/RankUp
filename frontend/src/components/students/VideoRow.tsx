import { useNavigate } from "react-router-dom";
import type { Video } from "../../types/video";

export default function VideoRow({
  video,
  courseId,
  locked,
}: {
  video: Video;
  courseId: string;
  locked: boolean;
}) {
  const navigate = useNavigate();

  return (
    <button
      disabled={locked}
      onClick={() => navigate(`/student/course/${courseId}/player?videoId=${video.id}`)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition
        ${locked ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50"}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{locked ? "🔒" : "▶️"}</span>
        <div>
          <div className="font-medium">{video.title}</div>
          {video.durationSeconds != null && (
            <div className="text-xs text-gray-500">{Math.round(video.durationSeconds / 60)} min</div>
          )}
        </div>
      </div>
      <span className="text-xs text-gray-500">Open</span>
    </button>
  );
}
