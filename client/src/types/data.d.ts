export type User = {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
  role: "Studente" | "Insegnante";
  createdAt: string;
};
