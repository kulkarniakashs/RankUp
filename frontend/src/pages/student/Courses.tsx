import { useEffect, useMemo, useState } from "react";
import CourseCard from "../../components/students/CourseCard";
import EmptyState from "../../components/students/EmptyState";
import CategoryTabs from "../../components/students/CategoryTabs";
import { coursesApi } from "../../api/courseApi";
import { studentApi } from "../../api/studentApi";
import { categoryApi } from "../../api/categoriesApi";
import type { Course } from "../../types/course";
import type { Category } from "../../types/category";

export default function StudentCourses() {
  const [approved, setApproved] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // Initial load: categories + myCourses + all approved
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [cats, mine, all] = await Promise.all([
          categoryApi.list(),
          studentApi.myCourses(),
          coursesApi.approved(),
        ]);
        setCategories(cats);
        setMyCourses(mine);
        setApproved(all);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // When category changes -> fetch filtered approved courses from backend
  useEffect(() => {
    async function loadCoursesByCategory() {
      setLoadingCourses(true);
      try {
        const data = await coursesApi.approved(selectedCategoryId ?? undefined);
        setApproved(data);
      } finally {
        setLoadingCourses(false);
      }
    }

    // After initial load, this will run too; that's okay.
    loadCoursesByCategory();
  }, [selectedCategoryId]);

  const purchasedIds = useMemo(() => new Set(myCourses.map((c) => c.id)), [myCourses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return approved;
    return approved.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [approved, query]);

  if (loading) return <div className="text-gray-600">Loading courses...</div>;

  return (
    <div className="space-y-5">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-1">
            Browse approved courses and continue learning.
          </p>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="w-full md:w-90 rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 backdrop-blur-xl"
        />
      </div>

      <CategoryTabs
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelect={(id) => setSelectedCategoryId(id)}
      />

      {/* Loading courses for selected category */}
      {loadingCourses && (
        <div className="text-sm text-gray-500">Loading courses...</div>
      )}

      {/* Course grid */}
      {filtered.length === 0 ? (
        <EmptyState title="No courses found" subtitle="Try a different keyword or category." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              purchased={purchasedIds.has(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
