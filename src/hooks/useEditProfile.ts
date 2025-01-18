"use client";
import {  updateUserProfile, uploadFile } from "@/apiService";
import { useLoading } from "@/context/LoadingContext";
import { UserProfileData,UserProfileResponse } from "@/interfaces/api";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SingleValue } from "react-select";
import Swal from "sweetalert2";


interface CountryData {
    label: string;
    value: string;
  }
  
export const useEditProfile = (data:UserProfileResponse) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setIsLoading } = useLoading();
    const [image, setImage] = useState<string | null>(null);
    const [formInput, setFormInput] = useState<UserProfileResponse>({
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
        setFormInput((prevInput : any) => ({
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
      console.log("test");
      const filteredFormInput: UserProfileData = {
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
            title: "Success",
            text: "Profile updated successfully!",
          });
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error updating the Profile.",
        });
      }
    };


    useEffect(() => {
      const getUser = async () => {
        setIsLoading(true);
        try {
          const response =  data;
          console.log('datat responce',response);
          setFormInput(response);
          console.log('data frominput',formInput);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching get user:", error);
          setIsLoading(false);
        }
      };
  
      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  

  return {
    fileInputRef,
    formInput,
    image,
    handleCountryChange,
    handleInputChange,
    handleCroppedImage,
    handleButtonClick,
    handleSubmit,
  };
};
