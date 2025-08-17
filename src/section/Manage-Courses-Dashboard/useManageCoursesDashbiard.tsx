import { setCourseToDraftStatus } from "@/apiService";
import { updateCourseStatus } from "@/apiServiceDashboard";
import { CoursesResponse } from "@/interfaces/api";
import { MRT_ColumnDef, MRT_Cell, MRT_Row } from "mantine-react-table";
import Swal from "sweetalert2";

export const handleView = (rowIndex: number, data: CoursesResponse[]) => {
  const course = data[rowIndex];
  if (course) {
    const url = `/course-details/${course.slug}`;
    window.open(url, "_blank");
  } else {
    console.error("Course data not found!");
  }
};

/*
export const handleDelete = async (
  rowIndex: number,
  data: CoursesResponse[],
  setData: React.Dispatch<React.SetStateAction<CoursesResponse[]>>
) => {
  const courseId = data[rowIndex]?.id;
  if (!courseId) return Swal.fire({ icon: "warning", title: "Error", text: "Course ID not found!" });

  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmDelete.isConfirmed) return;

  try {
    const response = await deleteCourse(courseId);
    if (response.status === 200) {
      Swal.fire({ icon: "success", title: "Deleted", text: "Course deleted successfully!" });
      setData((prevData) => prevData.filter((course) => course.id !== courseId));
    } else {
      Swal.fire({ icon: "warning", title: "Failed", text: `Error: ${response.status}` });
    }
  } catch (error) {
    Swal.fire({ icon: "error", title: "Request Failed", text: `Something went wrong! ${error}` });
  }
};
*/

export const handleApprove = async (
  rowIndex: number,
  data: CoursesResponse[],
  setData: React.Dispatch<React.SetStateAction<CoursesResponse[]>>
) => {
  const courseId = data[rowIndex]?.id;
  if (!courseId) return Swal.fire({ icon: "warning", title: "Error", text: "Course ID not found!" });

  const confirmApprove = await Swal.fire({
    title: "Are you sure?",
    text: "This will approve the course!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, approve it!",
  });

  if (!confirmApprove.isConfirmed) return;

  try {
    const response = await updateCourseStatus({ publish_status: "APPROVED" }, courseId);
    if (response?.id === courseId) {
      Swal.fire({ icon: "success", title: "Approved", text: "Course approved successfully!" });
      setData((prevData) =>
        prevData.map((course) => (course.id === courseId ? { ...course, publish_status: "APPROVED" } : course))
      );
    } else {
      Swal.fire({ icon: "warning", title: "Failed", text: "Could not approve course." });
    }
  } catch (error) {
    Swal.fire({ icon: "error", title: "Request Failed", text: `Something went wrong! ${error}` });
  }
};

export const handleReject = async (
  rowIndex: number,
  data: CoursesResponse[],
  setData: React.Dispatch<React.SetStateAction<CoursesResponse[]>>
) => {
  const courseId = data[rowIndex]?.id;
  if (!courseId) return Swal.fire({ icon: "warning", title: "Error", text: "Course ID not found!" });

  try {
    const response = await updateCourseStatus({ publish_status: "REJECTED" }, courseId);
    if (response?.id === courseId) {
      Swal.fire({ icon: "success", title: "Rejected", text: "Course rejected successfully!" });
      setData((prevData) =>
        prevData.map((course) => (course.id === courseId ? { ...course, publish_status: "REJECTED" } : course))
      );
    } else {
      Swal.fire({ icon: "warning", title: "Failed", text: "Could not reject course." });
    }
  } catch (error) {
    Swal.fire({ icon: "error", title: "Request Failed", text: `Something went wrong! ${error}` });
  }
};

export const handleUnPublish = async (
  rowIndex: number,
  data: CoursesResponse[],
  setData: React.Dispatch<React.SetStateAction<CoursesResponse[]>>
) => {
  const courseId = data[rowIndex]?.id;
  if (!courseId) return Swal.fire({ icon: "warning", title: "Error", text: "Course ID not found!" });

  try {
      await setCourseToDraftStatus(courseId.toString());
      Swal.fire({ icon: "success", title: "UnPublish", text: "Course UnPublish successfully!" });
      setData((prevData) =>
        prevData.map((course) => (course.id === courseId ? { ...course, publish_status: "DRAFT" } : course))
      );
  } catch (error) {
    Swal.fire({ icon: "error", title: "UnPublish Failed", text: `Something went wrong! ${error}` });
  }
};

export const handelStatusHistory = (
  rowIndex: number,
  data: CoursesResponse[],
  setPopupStatusHistory: React.Dispatch<React.SetStateAction<CoursesResponse[]>>,
  setShowStartPopup: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const course = data[rowIndex];
  if (!course) {
    console.error("Course not found!");
    return;
  }

  const statusHistory = course.CourseStatusLog || []; 

  setPopupStatusHistory(statusHistory); 
  setShowStartPopup(true);
};



// Columns definition
export const columns: MRT_ColumnDef<any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "slug", header: "Slug" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "difficulty", header: "Difficulty" },
  {
    accessorKey: "publish_status",
    header: "Status",
    Cell: ({ cell }: { cell: MRT_Cell<any> }) => {
      const status = cell.getValue<string>();
      const statusColors: Record<string, string> = {
        DRAFT: "orange",
        APPROVED: "green",
        REJECTED: "red",
      };

      return (
        <span
          style={{
            color: "white",
            backgroundColor: statusColors[status] || "gray",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "parent_version_id",
    header: "Is Version",
    Cell: ({ row }: { row: MRT_Row<any> }) => {
      const id = row.original.id;
      const parentVersionId = row.original.parent_version_id;

      if (id !== parentVersionId) {
        return (
          <span
            style={{
              backgroundColor: "#d2691e",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Yes
          </span>
        );
      }

      return null; 
    },
  },
  { accessorKey: "teacher.id", header: "Teacher ID" },
  { accessorKey: "teacher.username", header: "Teacher User Name" },
  { accessorKey: "created_at", header: "created at" },

];
