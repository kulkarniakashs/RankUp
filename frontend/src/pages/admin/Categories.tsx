import { useEffect, useState } from "react";
import type { Category } from "../teacher/CreateCourse";
import { categoryApi } from "../../api/categoriesApi";
import { http } from "../../api/http";

export default function AdminCategories() {
  const [cat, setCat] = useState<Category[] | undefined>();
  const [category, setCategory] = useState<String>("");
  async function setUp() {
    const res = await categoryApi.list();
    setCat(res);
  }
  useEffect(()=>{
    setUp();
  },[])
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Categories</h1>

      <div className="grid grid-cols-2 gap-2.5 justify-items-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6 space-y-4">
          <input
            placeholder="Category name"
            className="w-full rounded-xl border px-4 py-2"
            onChange={(e)=>{setCategory(e.target.value)}}
          />

          <button className="rounded-xl bg-blue-600 text-white px-6 py-2 font-semibold" onClick={async ()=>{
            try {
              if(category == "" ) return;
              let res = await http.post('/categories', {
                name : category
              })
              if(cat) setCat([...cat, res.data]);
              else setCat([res.data])
            } catch (error) {
              alert(error);
            }
          }}>
            Create Category
          </button>

        </div>
          <div >
          {
            cat && cat.map((c)=>{
              return <div className="px-2.5 py-1.5 text-xs border-1 rounded-xl">{c.name}</div>
            })
          }
          </div>
      </div>
    </div>
  );
}
