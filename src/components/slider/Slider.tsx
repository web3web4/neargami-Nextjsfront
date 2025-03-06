"use client";
import React, { ReactNode } from "react";
import SlickSlider from "react-slick";

interface SliderProps {
  children: ReactNode;
  className?: string;
}
const Slider = ({ children, className, ...props }: SliderProps) => {
  const AllClasses = ["slick__slider"];
  if (className) {
    AllClasses.push(className);
  }

  return (
    <SlickSlider className={AllClasses.join(" ")} {...props}>
      {children}
    </SlickSlider>
  );
};

const SliderItem = ({ children, className }: SliderProps) => {
  const AllClasses = ["slick__slider__item"];
  if (className) {
    AllClasses.push(className);
  }

  return <div className={AllClasses.join(className)}>{children}</div>;
};

export { Slider, SliderItem };
