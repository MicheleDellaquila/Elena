import type { ColumnDef } from "@tanstack/react-table";
import type { EnrolledCourse } from "@/types/data";
import { Link } from "react-router-dom";
import Icon from "@components/icon/Icon";
import getStatusClass from "@helpers/getStatusClass";
import getCategoryClass from "@helpers/getCategoryClass";

export const coursesTableColumns: ColumnDef<EnrolledCourse>[] = [
  {
    accessorKey: "status",
    header: "Stato",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded ${getStatusClass(status)}`}>{status}</span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Nome del corso",
  },
  {
    accessorKey: "progress",
    header: "Progresso",
    cell: ({ row }) => `${row.original.progress}%`,
  },
  {
    accessorKey: "teacherName",
    header: "Docente",
  },
  {
    accessorKey: "teacherEmail",
    header: "Email docente",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.original.category;
      return <span className={`px-2 py-1 rounded ${getCategoryClass(category)}`}>{category}</span>
    },
  },
  {
    accessorKey: "enrolledAt",
    header: "Data di iscrizione",
    cell: ({ row }) => new Date(row.original.enrolledAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Azioni",
    cell: ({ row }) => {
      return (
        <Link
          className='flex gap-x-1 w-fit bg-gray-200 py-1 px-2 rounded-md hover:bg-gray-300 transition-colors'
          to={`/courses/${row.original.courseId}`}
        >
          <span className='text-gray-950'>Vai al corso</span>
          <Icon iconName='ArrowUpRight' size={20} />
        </Link>
      );
    },
  },
];
