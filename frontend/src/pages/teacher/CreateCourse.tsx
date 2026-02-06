export default function CreateCourse() {
  return (
    <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold">Create Course</h1>

      <div className="mt-4 space-y-4">
        <input placeholder="Course title" className="w-full rounded-xl border px-4 py-2" />
        <textarea placeholder="Description" className="w-full rounded-xl border px-4 py-2" />
        <input placeholder="Price" type="number" className="w-full rounded-xl border px-4 py-2" />

        <button className="rounded-xl bg-blue-600 text-white px-6 py-2 font-semibold">
          Save Draft
        </button>
      </div>
    </div>
  );
}
