import React from "react";
import { useLoading } from "@/context/LoadingContext"; 
import Loading from "../Loading";

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();

  return isLoading ? <Loading /> : children;
};

export default LoadingWrapper;