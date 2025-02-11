import Swal from "sweetalert2";
import { UserProfileResponse } from "@/interfaces/api";
import { cancelAdmin } from "@/apiServiceDashboard";



export const handleCancelAdmin = async (
  rowIndex: number,
  data: UserProfileResponse[],
  setData: React.Dispatch<React.SetStateAction<UserProfileResponse[]>>
) => {
  const userId = data[rowIndex]?.id;

  if (!userId) {
    console.error("User ID not found!");
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "User ID not found!",
    });
    return;
  }

  const confirmCancel = await Swal.fire({
    title: "Are you sure?",
    text: "This will revoke the admin privileges!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, revoke admin!",
  });

  if (!confirmCancel.isConfirmed) return;

  try {
    const response = await cancelAdmin(userId);

    if (response?.id === userId) {
      Swal.fire({
        icon: "success",
        title: "Admin Revoked",
        text: "User admin rights have been removed successfully!",
      });

      setData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, isAdmin: false } : user
        )
      );
    } else {
      Swal.fire({
        icon: "warning",
        title: "Failed to Revoke Admin",
        text: `Error: ${response.status} - ${response.statusText}`,
      });
    }
  } catch (error) {
    console.error("Error canceling admin:", error);
    Swal.fire({
      icon: "error",
      title: "Request Failed",
      text: "Something went wrong while processing your request!",
    });
  }
};


/*
export const handleDelete = async (
  rowIndex: number,
  data: UserProfileResponse[],
  setData: React.Dispatch<React.SetStateAction<UserProfileResponse[]>>
) => {
  const userId = data[rowIndex]?.id;

  if (!userId) {
    console.error("User ID not found!");
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "User ID not found!",
    });
    return;
  }

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
    const response = await deleteUser(userId);

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "User Deleted",
        text: "User has been deleted successfully!",
      });

      setData((prevData) => prevData.filter((user) => user.id !== userId));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Failed to Delete",
        text: `Error: ${response.status} - ${response.statusText}`,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    Swal.fire({
      icon: "error",
      title: "Request Failed",
      text: "Something went wrong while processing your request!",
    });
  }
};
*/


export const handleView = (rowIndex: number, data: UserProfileResponse[]) => {
  const user = data[rowIndex];
  if (user) {
    const url = `/profile/${user.username}/${user.id}`;
    window.open(url, "_blank");
  } else {
    console.error("User data not found!");
  }
};
