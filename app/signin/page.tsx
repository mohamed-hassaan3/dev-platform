import SigninForm from "@/components/ui/signin-form";
import React from "react";
import { ToastContainer } from "react-toastify";
const page = () => {
  return (
    <div>
      <div className="absolute to-0">
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
      <SigninForm />
    </div>
  );
};

export default page;
