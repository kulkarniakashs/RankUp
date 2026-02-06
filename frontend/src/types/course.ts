export interface Course {
  id: string;
  title: string;
  description: string;
  fee: number;
  thumbnailKey?: string;
  teacherName : string;
  teacherId : string;
  teacherProfilePhotoKey : string;
  categoryId : string;
}

export interface TeacherCourse extends Course {
  status : string;
  categoryName : string;
}