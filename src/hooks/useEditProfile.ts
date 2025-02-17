"use client";
import { updateUserProfile, uploadFile } from "@/apiService";
import { UserProfileData, UserProfileResponse } from "@/interfaces/api";
import { useTranslations } from "next-intl";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SingleValue } from "react-select";
import Swal from "sweetalert2";

interface CountryData {
  label: string;
  value: string;
}

export const useEditProfile = (data: UserProfileResponse) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [initUsername, setInitUsername] = useState<string>("");
  const translate = useTranslations("messages");
  const [formInput, setFormInput] = useState<UserProfileResponse>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    discord: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    image: "",
  });

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

  const handleCroppedImage = async (img: any) => {
    try {
      setImage(img);
      const url = await uploadFile(img);
      setFormInput((prevInput: any) => ({
        ...prevInput,
        image: url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formInput.username!.trim() === "") {
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate(
          "The Username Field Is Required Please Enter Your Username"
        ),
      });
      return;
    }
    if (formInput.username!.length < 4) {
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate("The username must be at least 4 characters long"),
      });
      return;
    }
    if (!isUsernameAvailable) {
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate("Username Is Already Exist"),
      });
      return;
    }

    const filteredFormInput: UserProfileData = {
      username: formInput.username,
      firstname: formInput.firstname,
      lastname: formInput.lastname,
      email: formInput.email,
      country: formInput.country,
      discord: formInput.discord,
      facebook: formInput.facebook,
      twitter: formInput.twitter,
      linkedin: formInput.linkedin,
      image: formInput.image,
    };

    try {
      const updatedUser = await updateUserProfile(filteredFormInput);
      if (updatedUser) {
        Swal.fire({
          icon: "success",
          title: translate("Success"),
          text: translate("Profile updated successfully!"),
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      Swal.fire({
        icon: "error",
        title: translate("Error"),
        text: translate("There was an error updating the Profile"),
      });
    }
  };

  useEffect(() => {
    const response = data;
    console.log("datat responce", response);
    setFormInput(response);
    console.log("data frominput", formInput);
    setInitUsername(data.username!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    initUsername,
    fileInputRef,
    formInput,
    image,
    handleCountryChange,
    handleInputChange,
    handleCroppedImage,
    handleButtonClick,
    handleSubmit,
    setIsUsernameAvailable,
  };
};
