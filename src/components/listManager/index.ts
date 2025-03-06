import { updateOrderLesson } from "@/apiService";
import Swal from "sweetalert2";

export const moveUp = async (index: number, arrangeFild: string,  data: any[], setData: (data: any[]) => void): Promise<void> => {
  if (index === 0) return;
  const newData = [...data];
  [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
  reassignNumbers(arrangeFild, newData, setData);
};

export const moveDown = async (index: number, arrangeFild: string, data: any[], setData: (data: any[]) => void): Promise<void> => {
  if (index === data.length - 1) return;
  const newData = [...data];
  [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
  reassignNumbers(arrangeFild, newData, setData);
};

const reassignNumbers = async ( arrangeFild: string, newData: any, setData: any) => {
  const updatedData = newData.map((item: any, i: number) => ({
    ...item,
    [arrangeFild]: i + 1, 
  }));

  setData(updatedData);


  await handleUpdateOrder(updatedData);
};


export const handleUpdateOrder = async (data: any) => {
  const orders = data.map((item: any) => ({
    id: item.id,
    order: item.order,
  }));

  const courseId = data[0]?.course.id;
  try {
    const create = await updateOrderLesson({ orders }, courseId);
    if (create) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Item order updated successfully.",
      });
    }
  } catch (error) {
    console.error("Error in creating Lesson:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error update Item order .",
    });
  }
};


