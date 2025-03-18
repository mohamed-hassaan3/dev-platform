"use client";
import React from "react";

const Button = ({
  children,
  size = "meduim",
  color = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${className} ${size} ${color} Button`} {...props}>
      {children}
    </button>
  );
};

export default Button;
