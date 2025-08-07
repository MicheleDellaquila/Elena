export type User = {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: "Studente" | "Insegnante";
  createdAt: string;
};

export interface ErrorAPIResponse {
  error: string;
}

export type StatusCourse = "Da fare" | "In corso" | "Completato";
export type EnrolledCourse = {
  courseId: string;
  status: StatusCourse;
  progress: number;
  enrolledAt: Date;
  title: string;
  category: string;
  teacherName: string;
  teacherEmail: string;
};
