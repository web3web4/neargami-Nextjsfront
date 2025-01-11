import { updateUserProfile } from "@/apiService";
import { UserProfileData } from "@/interfaces/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SingleValue } from "react-select";
import Swal from "sweetalert2";


interface CountryData {
    label: string;
    value: string;
  }
export const useWizard = () => {
const router = useRouter();

const [isAccepted, setIsAccepted] = useState<boolean>(false);
const [step, setStep] = useState<number>(1);
const [formInput, setFormInput] = useState<UserProfileData>({
  firstname: "",
  lastname: "",
  email: "",
  country: "",
});

useEffect(() => {
  localStorage.removeItem("firstLogin");
}, []);

const handleCountryChange = (selectedCountry: SingleValue<CountryData>) => {
  if (selectedCountry) {
    setFormInput((prevInput) => ({
      ...prevInput,
      country: selectedCountry.label,
    }));
  }
};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;
  setFormInput((prevInput) => ({
    ...prevInput,
    [id]: value,
  }));
};

const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
  setIsAccepted(e.target.checked);
};

const handleNext = () => {
  if (step === 1 && !isAccepted) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please accept the terms and conditions before proceeding.",
    });
    return;
  }
  if (step < 2) setStep(step + 1);
};

const handlePrev = () => {
  if (step > 1) setStep(step - 1);
};

/**
 * This function updates the user's profile.
 */
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const responce = await updateUserProfile(formInput); // Ensure updateUserProfile is typed correctly elsewhere
    console.log("User updated successfully",responce);
  } catch (error) {
    console.error("Error updating user profile:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error created.",
    });
  }
};

const handleComplateToProfile = async (e: FormEvent) => {
  await handleSubmit(e);
  router.push('/profile'); // Using direct navigation instead of Link
};

const handleBackToHome = async (e: FormEvent) => {
  await handleSubmit(e);
  router.push('/');; // Using direct navigation instead of Link
};
return{
    step,
    formInput,
    isAccepted,
    
    handleNext,
    handlePrev,
    handleBackToHome,
    handleInputChange,
    handleCountryChange,
    handleCheckboxChange,
    handleComplateToProfile,
}

};