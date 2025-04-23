import { PostForm } from "@/modules/PostForm";
// import ProfileDashboard from "@/modules/ProfileDashboard";
import React from "react";
import AuthGuard from "../AuthGuard";

const Profile = () => {
  return (
    <div className="w-[80%] m-auto pr-8 pl-8 pb-8 md:pt-8 pt-0 lg:w-[50%] h-full">
      <AuthGuard>
        {/* <ProfileDashboard /> */}
        <PostForm />
      </AuthGuard>
    </div>
  );
};

export default Profile;
