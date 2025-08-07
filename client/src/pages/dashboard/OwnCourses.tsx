import { useMemo } from "react";
import ButtonLink from "@components/ui/ButtonLink";
import Icon from "@components/icon/Icon";
import CoursesPaginationTable from "@components/coursesPaginationTable/CoursesPaginationTable";
import Loader from "@components/ui/Loader";
import { coursesTableColumns } from "@constants/tableColumns";
import { useNavigate } from "react-router-dom";
import useEnrolledCourses from "./hook/useEnrolledCourses";

const OwnCourses = () => {
  const navigate = useNavigate();
  const { enrolledCourses, loading } = useEnrolledCourses();
  const memorizedCoursesTableColumns = useMemo(() => coursesTableColumns, []);

  return (
    <section>
      <header className='flex flex-wrap gap-2 sm:gap-0 sm:flex-none sm:items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>I tuoi corsi</h2>
        <ButtonLink className='w-fit border sm:w-auto' onClick={() => navigate("/corsi")}>
          <Icon iconName='BookOpen' /> Esplora altri corsi
        </ButtonLink>
      </header>
      {loading && <Loader size='small' />}
      {enrolledCourses.length && !loading && (
        <CoursesPaginationTable
          columns={memorizedCoursesTableColumns}
          data={enrolledCourses}
        />
      )}
    </section>
  );
};

export default OwnCourses;
