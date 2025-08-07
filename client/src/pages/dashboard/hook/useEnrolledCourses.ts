import { useCallback, useEffect, useState } from "react";
import type { EnrolledCourse } from "@/types/data";
import { AxiosError } from "axios";
import { userEnrolledCourses } from "@services/users/usersService";
import { errorNotification } from "@lib/notification";

const useEnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await userEnrolledCourses();
      if ("data" in response) setEnrolledCourses([...response.data]);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorNotification(
          "Errore nel caricamento dei corsi",
          "Si prega di riprovare più tardi"
        );
        console.error("API Error:", error.response?.data.error); 
      } else {
        errorNotification("Errore di sistema", "Si prega di riprovare più tardi");
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrolledCourses();
  }, [fetchEnrolledCourses]);

  return { enrolledCourses, loading };
};

export default useEnrolledCourses;
