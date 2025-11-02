"use client";
import React, { ReactNode } from "react";
import SlickSlider, { Settings } from "react-slick";

interface SliderProps extends Settings {
  children: ReactNode;
  className?: string;
}
const Slider = ({ children, className, ...props }: SliderProps) => {
  const AllClasses = ["slick__slider"];
  if (className) {
    AllClasses.push(className);
  }

  // Type assertion to fix react-slick TypeScript compatibility issue
  const SlickComponent = SlickSlider as any;

  return (
    <SlickComponent className={AllClasses.join(" ")} {...props}>
      {children}
    </SlickComponent>
  );
};

const SliderItem = ({ children, className }: SliderProps) => {
  const AllClasses = ["slick__slider__item"];
  if (className) {
    AllClasses.push(className);
  }

  return <div className={AllClasses.join(" ")}>{children}</div>;
};

export { Slider, SliderItem };
