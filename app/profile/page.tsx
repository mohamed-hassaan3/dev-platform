import { PostForm } from "@/modules/PostForm";
import ProfileDashboard from "@/modules/ProfileDashboard";
import React from "react";

const Profile = () => {
  return (
    <div className="">
      <ProfileDashboard />
      <PostForm />
    </div>
  );
};

export default Profile;
