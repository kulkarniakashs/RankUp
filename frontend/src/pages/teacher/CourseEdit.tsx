import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Module } from "../../types/module";
import type { Video } from "../../types/video";
import type { TeacherCourse } from "../../types/course";
import { modulesApi } from "../../api/moduleApi";
import { videosApi } from "../../api/videoApi";
import { http } from "../../api/http";
import { ProgressBar } from "../../components/teacher/ProgressBar";
import axios from "axios";

type VideoMap = Record<string, Video[]>;

export default function TeacherCourseEdit() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const r2PublicBaseUrl = import.meta.env.VITE_APP_R2;
  const [course, setCourse] = useState<TeacherCourse | null>(null);

  const [uploading, setUploading] = useState<number | null>();
  // Modules + videos
  const [modules, setModules] = useState<Module[]>([]);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [videosByModule, setVideosByModule] = useState<VideoMap>({});
  const [loading, setLoading] = useState(true);
  const [loadingVideosFor, setLoadingVideosFor] = useState<string | null>(null);

  // Add module
  const [showAddModule, setShowAddModule] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

  // Add video (with file input)
  const [addVideoFor, setAddVideoFor] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Thumbnail URL
  const thumbnailUrl = useMemo(() => {
    if (!course?.thumbnailKey) return null;
    if (!r2PublicBaseUrl) return null;
    return `${r2PublicBaseUrl}/${course.thumbnailKey}`;
  }, [course?.thumbnailKey, r2PublicBaseUrl]);

  async function fetchCourseDetails(courseId: String) {
    try {
      console.log("Fetching");
      const res = await http.get(`/teacher/course/${courseId}`);
      setCourse(res.data as TeacherCourse);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  async function fetchModules(corseId: string) {
    try {
      const mods = await modulesApi.byCourse(corseId);
      setModules(mods);
      console.log(mods);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (!courseId) return;
    fetchCourseDetails(courseId);
    fetchModules(courseId);
  }, [courseId]);

  async function toggleModule(moduleId: string) {
    const next = openModuleId === moduleId ? null : moduleId;
    setOpenModuleId(next);

    if (next && !videosByModule[next]) {
      setLoadingVideosFor(next);
      try {
        const vids = await videosApi.byModule(next);
        setVideosByModule((prev) => ({ ...prev, [next]: vids }));
      } finally {
        setLoadingVideosFor(null);
      }
    }
  }

  // UI-only add module
  async function addModuleUIOnly() {
    if (!courseId) return;
    if (!moduleTitle.trim()) return;
    try {
      let res = await http.post(`/courses/${courseId}/modules`, {
        title: moduleTitle,
        description: moduleDesc,
        sortOrder: modules.length + 1,
      });
      setModules((prev) => [...prev, res.data]);
      setShowAddModule(false);
      setModuleTitle("");
      setModuleDesc("");
    } catch (err) {
      alert(err);
    }
  }

  async function addVideoUIOnly(moduleId: string) {
    if (!videoTitle.trim()) return;
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }
    try {
      const res = await http.post(`/uploads/video/init`, {
        moduleId,
        fileName: videoTitle,
        contentType: videoFile.type,
      });
      console.log("URL", res.data);

      await axios.put(res.data.uploadUrl, videoFile, {
        headers: {
          "Content-Type": videoFile.type,
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? videoFile.size;
          if (!total) return;
          setUploading(Math.round((progressEvent.loaded * 100) / total));
        },
      });

      let vid = await http.post(`/modules/${moduleId}/videos`, {
        title: videoTitle,
        description: videoDesc,
        sortOrder: videosByModule[moduleId].length + 1,
        rawObjectKey: res.data.objectKey,
      });

      setVideosByModule((prev) => ({
        ...prev,
        [moduleId]: [...(prev[moduleId] || []), vid.data],
      }));
      setUploading(null);

      setAddVideoFor(null);
      setVideoTitle("");
      setVideoDesc("");
      setVideoFile(null);
    } catch (error) {
      alert(error);
    }
  }

  if (loading) {
    return <div className="text-gray-600">Loading course editor...</div>;
  }

  if (!course) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-8 text-center text-gray-700">
        Course not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ===== Course Header Card ===== */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow overflow-hidden">
        {/* Thumbnail OR default background */}
        <div className="relative h-52">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="course thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-r from-blue-100 via-purple-100 to-green-100" />
          )}

          <div className="absolute inset-0 bg-black/10" />

          {/* Top actions */}
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={() => navigate(`/teacher/course/${courseId}/edit/meta`)}
              className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              Edit metadata
            </button>

            <button
              onClick={() => navigate(`/teacher/course/${courseId}`)}
              className="rounded-xl bg-white/80 backdrop-blur border border-white/60 px-5 py-2 text-sm font-semibold hover:bg-white transition"
            >
              Back
            </button>
          </div>
        </div>

        {/* Title + Description ONLY */}
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {course.title}
          </h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
      </div>

      {/* ===== Modules Section ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Modules</h2>

          <button
            onClick={() => setShowAddModule((v) => !v)}
            className="rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            + Add Module
          </button>
        </div>

        {/* Add Module Form */}
        {showAddModule && (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-5 space-y-3">
            <input
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              placeholder="Module title"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
            />
            <input
              value={moduleDesc}
              onChange={(e) => setModuleDesc(e.target.value)}
              placeholder="Module description (optional)"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
            />
            <div className="flex gap-3">
              <button
                onClick={addModuleUIOnly}
                className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold hover:opacity-90"
              >
                Save Module
              </button>
              <button
                onClick={() => setShowAddModule(false)}
                className="rounded-xl bg-white border px-5 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Modules Accordion */}
        {modules.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-8 text-center text-gray-600">
            No modules yet. Add your first module.
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((m) => {
              const isOpen = openModuleId === m.id;
              const videos = videosByModule[m.id] || [];

              return (
                <div
                  key={m.id}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl shadow overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(m.id)}
                    className="w-full p-5 flex items-start justify-between text-left hover:bg-white/60 transition"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">
                        {m.title}
                      </div>
                      {m.description && (
                        <div className="text-sm text-gray-600 mt-1 line-clamp-1">
                          {m.description}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-500 text-lg">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-200/60 p-5 space-y-3">
                      {/* Videos */}
                      {loadingVideosFor === m.id ? (
                        <div className="text-sm text-gray-500">
                          Loading videos...
                        </div>
                      ) : videos.length === 0 ? (
                        <div className="text-sm text-gray-600">
                          No videos yet. Add the first video.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {videos.map((v) => (
                            <div
                              key={v.id}
                              className="rounded-xl border border-gray-200 bg-white/60 px-4 py-3"
                            >
                              <div className="font-medium text-gray-900">
                                {v.title}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {v.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {addVideoFor === m.id ? (
                        <div className="rounded-2xl border border-gray-200 bg-white/60 p-4 space-y-3">
                          <input
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                            placeholder="Video title"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
                          />

                          <input
                            value={videoDesc}
                            onChange={(e) => setVideoDesc(e.target.value)}
                            placeholder="Video description"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
                          />
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Video file
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) =>
                                setVideoFile(e.target.files?.[0] ?? null)
                              }
                              className="mt-1 block w-full text-sm text-gray-700
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-xl file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-900 file:text-white
                                hover:file:opacity-90"
                            />
                            {videoFile && (
                              <div className="text-xs text-gray-500 mt-2">
                                Selected:{" "}
                                <span className="font-medium">
                                  {videoFile.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {!uploading && (
                            <div className="flex gap-3 pt-1">
                              <button
                                onClick={() => addVideoUIOnly(m.id)}
                                className="rounded-xl bg-blue-600 text-white px-5 py-2 text-sm font-semibold hover:opacity-90"
                              >
                                Save Video
                              </button>
                              <button
                                onClick={() => setAddVideoFor(null)}
                                className="rounded-xl bg-white border px-5 py-2 text-sm font-semibold hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                          <div>
                            {uploading && <ProgressBar value={uploading} />}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAddVideoFor(m.id);
                            setVideoTitle("");
                            setVideoDesc("");
                            setVideoFile(null);
                          }}
                          className="text-sm font-semibold text-blue-700 hover:underline"
                        >
                          + Add Video
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
