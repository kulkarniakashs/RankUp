import React, { useEffect, useMemo, useRef, useState } from "react";
import { categoryApi } from "../../api/categoriesApi";
import { useNavigate } from "react-router-dom";
import { http } from "../../api/http";
import { thumbnailUpload } from "../../api/thumbnailUpload";

export interface Course {
  id: string;
  title: string;
  description: string;
  fee: number;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function TeacherCourseCreatePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState<number>(0);
  const [categoryId, setCategoryId] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null,
  );

  async function createCourse( ) {
    try {
      const res = await http.post("/courses", {
        categoryId,
        title,
        description,
        fee,
      });
      if(thumbnailFile) await thumbnailUpload(res.data.id, thumbnailFile)
      return res.data.id;
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoadingCats(true);
      try {
        const data = await categoryApi.list();
        if (!alive) return;
        setCategories(data);
        // default select first (optional UX)
        if (data.length && !categoryId) setCategoryId(data[0].id);
      } finally {
        if (alive) setLoadingCats(false);
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);

  const canSubmit = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      categoryId.trim().length > 0 &&
      Number.isFinite(fee) &&
      fee >= 0 &&
      !submitting
    );
  }, [title, description, categoryId, fee, submitting]);

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

  function clearThumbnail() {
    setThumbnailFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleCreate() {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const id = await createCourse();
      setSubmitting(false);
      navigate(`/teacher/course/${id}/edit`);
    } catch (e) {
      alert("Failed to create course.");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Create Course
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Add course details and optionally upload a thumbnail.
            </p>
          </div>

          <button
            onClick={handleCreate}
            disabled={!canSubmit}
            className={`rounded-xl px-4 py-2 text-sm font-medium shadow-sm active:scale-[0.99]
              ${
                canSubmit
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          {/* Thumbnail card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Thumbnail (optional)
              </h2>
              {thumbnailFile && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Selected
                </span>
              )}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {thumbnailPreviewUrl ? (
                <img
                  src={thumbnailPreviewUrl}
                  alt="Thumbnail preview"
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center text-sm text-slate-500">
                  No thumbnail selected
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

              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.99]"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                Upload Thumbnail
              </button>

              {thumbnailFile ? (
                <button
                  type="button"
                  onClick={clearThumbnail}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Remove
                </button>
              ) : (
                <p className="text-xs text-slate-500">
                  Thumbnail is optional. You can add it now or later.
                </p>
              )}
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {loadingCats ? (
              <LoadingFormSkeleton />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <Field label="Title">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    placeholder="e.g. Spring Boot for Beginners"
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    placeholder="Write what students will learn..."
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
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400"
                    >
                      {categories.length === 0 ? (
                        <option value="">No categories</option>
                      ) : (
                        categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))
                      )}
                    </select>

                    {categories.length > 0 && (
                      <div className="mt-1 text-xs text-slate-500">
                        Selected:{" "}
                        <span className="font-medium text-slate-700">
                          {categories.find((c) => c.id === categoryId)?.slug ??
                            ""}
                        </span>
                      </div>
                    )}
                  </Field>
                </div>

                <div className="mt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setFee(0);
                      clearThumbnail();
                      if (categories.length) setCategoryId(categories[0].id);
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    disabled={submitting}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={!canSubmit}
                    className={`rounded-xl px-4 py-2 text-sm font-medium shadow-sm active:scale-[0.99]
                      ${
                        canSubmit
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "cursor-not-allowed bg-slate-200 text-slate-500"
                      }`}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Spinner />
                        Creating
                      </span>
                    ) : (
                      "Create Course"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-page submit overlay */}
        {submitting && <SubmittingOverlay />}
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

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
      aria-hidden="true"
    />
  );
}

function LoadingFormSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-32 rounded bg-slate-200" />
      <div className="mt-2 h-10 w-full rounded-xl bg-slate-200" />

      <div className="mt-5 h-5 w-40 rounded bg-slate-200" />
      <div className="mt-2 h-28 w-full rounded-xl bg-slate-200" />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="h-5 w-20 rounded bg-slate-200" />
          <div className="mt-2 h-10 w-full rounded-xl bg-slate-200" />
        </div>
        <div>
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="mt-2 h-10 w-full rounded-xl bg-slate-200" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <div className="h-10 w-24 rounded-xl bg-slate-200" />
        <div className="h-10 w-36 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function SubmittingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Creating course
            </div>
            <div className="text-xs text-slate-600">Please wait…</div>
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-900" />
        </div>
      </div>
    </div>
  );
}
