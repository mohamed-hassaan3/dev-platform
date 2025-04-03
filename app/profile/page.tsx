import { PostForm } from "@/modules/PostForm";
// import ProfileDashboard from "@/modules/ProfileDashboard";
import React from "react";
import AuthGuard from "../AuthGuard";

const Profile = () => {
  return (
    <div className="m-auto w-full">
      <AuthGuard>
        {/* <ProfileDashboard /> */}
        <PostForm />
      </AuthGuard>
    </div>
  );
};

export default Profile;
