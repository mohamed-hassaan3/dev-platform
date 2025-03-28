import React from "react";
import AuthGuard from "../AuthGuard";

const page = () => {
  return (
    <AuthGuard>
      <div className="w-full h-dvh p-24">
        Dashboard
        <main className="flex justify-center gap-16 h-dvh w-full m-auto text-white">
          <aside className=" bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white border dark:shadow-xl dark:border-gray-500 shadow-lg rounded-md p-3 w-1/2">
            Likes
          </aside>
          <aside className=" bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white border dark:shadow-xl dark:border-gray-500 shadow-lg rounded-md p-3 w-1/2">
            Comments
          </aside>
        </main>
      </div>
    </AuthGuard>
  );
};

export default page;
