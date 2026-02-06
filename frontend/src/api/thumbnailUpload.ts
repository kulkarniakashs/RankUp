import { http } from "./http";
import axios from "axios";
export async function thumbnailUpload(courseId: string, thumbnailFile: File) {
  try {
    const res = await http.post("uploads/course-thumbnail/init", {
      courseId: courseId,
      fileName: thumbnailFile?.name,
      contentType: thumbnailFile?.type,
    });
    await axios.put(res.data.uploadUrl, thumbnailFile, {
      headers: {
        "Content-Type": thumbnailFile?.type,
      },
    });
    await http.post(`/courses/${courseId}/thumbnail/confirm`, {
      objectKey: res.data.objectKey,
    });
  } catch (err) {
    alert(err);
  }
}
