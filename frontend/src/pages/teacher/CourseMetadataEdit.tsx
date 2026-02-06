import React, { useEffect, useMemo, useRef, useState } from "react";
import { http } from "../../api/http";
import { useNavigate, useParams } from "react-router-dom";
import type { TeacherCourse as Course } from "../../types/course";
import axios from "axios";

async function fetchCourseById(courseId: string): Promise<Course> {
  const res = await http.get(`/teacher/course/${courseId}`);
  return res.data as Course;
}

export default function CourseMetadataEdit() {
  const { courseId } = useParams(); // later you can take from useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState<number>(0);
  const [categoryName, setcategoryName] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        if (courseId) {
          const data = await fetchCourseById(courseId);
          if (!alive) return;
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setFee(data.fee);
          setcategoryName(data.categoryName);
          console.log(data);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [courseId]);

  // Preview URL lifecycle
  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);

  const existingThumbUrl = useMemo(() => {
    if (!course?.thumbnailKey) return null;
    // in your app thumbnailKey may be a key; for now dummy is a URL
    return import.meta.env.VITE_APP_R2 + '/' + course.thumbnailKey;
  }, [course?.thumbnailKey]);

  const shownThumbnail = thumbnailPreviewUrl ?? existingThumbUrl;

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      alert("Please select an image file (jpg/png/webp).");
      e.target.value = "";
      return;
    }

    setThumbnailFile(f);
  }

  function cancelNewThumbnail() {
    setThumbnailFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function thumbnailUpload() {
    try {
      const res = await http.post("uploads/course-thumbnail/init", {
        courseId: course?.id,
        fileName: thumbnailFile?.name,
        contentType: thumbnailFile?.type,
      });
      await axios.put(res.data.uploadUrl, thumbnailFile, {
        headers: {
          "Content-Type": thumbnailFile?.type,
        },
      });
      await http.put(`/courses/${courseId}/thumbnail/confirm`, {objectKey : res.data.objectKey});
    } catch (err) {
      alert(err);
    }
  }

  async function handleSave() {
    if (!course) return;

    if (!title) return alert("Title is required.");
    if (!description) return alert("Description is required.");
    if (!categoryName) return alert("Category is required.");
    if (fee < 0) return alert("Fee cannot be negative.");
    if (thumbnailFile) thumbnailUpload();
    await http.put(`/courses/${courseId}`,{
      title,  description, fee, categoryId : course.categoryId
    })
    navigate(`/teacher/course/${courseId}/edit`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
              <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
              <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-slate-900 font-semibold">Course not found</div>
            <p className="mt-1 text-sm text-slate-600">Try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Edit Course
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Prefilled values loaded from API. Thumbnail can be changed with
              preview.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 active:scale-[0.99]"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          {/* Thumbnail card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Thumbnail
              </h2>
              {thumbnailFile && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  New selected
                </span>
              )}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {shownThumbnail ? (
                <img
                  src={shownThumbnail}
                  alt="Course thumbnail"
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center text-sm text-slate-500">
                  No thumbnail
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onPickFile}
                className="hidden"
              />

              {/* Change Thumbnail button */}
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.99]"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                Change Thumbnail
              </button>

              {thumbnailFile ? (
                <button
                  type="button"
                  onClick={cancelNewThumbnail}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel New
                </button>
              ) : (
                <p className="text-xs text-slate-500">
                  Current thumbnail is shown. Selecting a new image will preview
                  it here.
                </p>
              )}
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                  placeholder="Course title"
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                  placeholder="Course description"
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Fee">
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    placeholder="0"
                    min={0}
                  />
                </Field>

                <Field label="Category">
                  <input
                    disabled={true}
                    value={categoryName}
                    onChange={(e) => setcategoryName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    placeholder="categoryName"
                  />
                </Field>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTitle(course.title);
                    setDescription(course.description);
                    setFee(course.fee);
                    setcategoryName(course.categoryName);
                    cancelNewThumbnail();
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 active:scale-[0.99]"
                >
                  Save
                </button>
              </div>

              <div className="mt-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                <span className="font-medium text-slate-800">Thumbnail:</span>{" "}
                not an input field. It’s previewed and uploaded only if you
                select a new image.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-slate-700">{label}</div>
      {children}
    </label>
  );
}
