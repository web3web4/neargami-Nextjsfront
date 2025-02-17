import { bloackUser, makeAdmin } from "@/apiServiceDashboard";
import { UserProfileData } from "@/interfaces/api";
import Swal from "sweetalert2";

/*
export const handleDelete = async (rowIndex: number, data: UserProfileData[]) => {
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

export const handleView = (rowIndex: number, data: UserProfileData[]) => {
    const user = data[rowIndex]; 
    if (user) {
        const url = `/profile/${user.username}`;
        window.open(url, "_blank"); 
    } else {
        console.error("User data not found!");
    }
};


export const handleBloack = async (rowIndex: number , data : UserProfileData[] , setData: React.Dispatch<React.SetStateAction<UserProfileData[]>>) => {
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

    try {
        const response = await bloackUser(userId);

        if (response?.id === userId) {
            Swal.fire({
                icon: "success",
                title: "Bloack User",
                text: "User status updated and Bloacked",
            });

            setData((prevData) =>
                prevData.map((user) =>
                    user.id === userId ? { ...user, blocked: true } : user
                )
            );

        } else {
            Swal.fire({
                icon: "warning",
                title: "Failed!",
                text: `Error: ${response.status} - ${response.statusText}`,
            });
        }
    } catch (error) {
        console.error("Error bloack:", error);
        Swal.fire({
            icon: "error",
            title: "Request Failed",
            text: "Something went wrong while processing your request!",
        });
    }
};

export const handleAdmin = async (rowIndex: number, data: UserProfileData[], setData: React.Dispatch<React.SetStateAction<UserProfileData[]>>) => {
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

    try {
        const response = await makeAdmin(userId);

        if (response?.id === userId) {
            Swal.fire({
                icon: "success",
                title: "Make Admin",
                text: "User status updated and became admin",
            });

            setData((prevData) => prevData.filter((user) => user.id !== userId));

        } else {
            Swal.fire({
                icon: "warning",
                title: "Failed!",
                text: `Error: ${response.status} - ${response.statusText}`,
            });
        }
    } catch (error) {
        console.error("Error making admin:", error);
        Swal.fire({
            icon: "error",
            title: "Request Failed",
            text: "Something went wrong while processing your request!",
        });
    }
};
