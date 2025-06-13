"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const AvatarImg = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_SIZE_MB = 1;

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Image size must be less than ${MAX_SIZE_MB}MB.`);
        setPreview(null);
        event.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const removeImg = () => {
    setPreview(null);
    setError(null);
    hiddenFileInputRef.current!.value = "";
  };

  const triggerFieldInput = () => {
    hiddenFileInputRef.current?.click();
  };

  return (
    <div
      className={`${
        preview && "h-fit pb-10"
      } py-1 relative mx-auto w-[100%] rounded-[10px] shadow-[4px_4px_30px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between bg-[rgba(0,110,255,0.041)] dark:bg-[rgba(0,0,0,0.5)]`}
    >
      {!preview && (
        <button
          type="button"
          onClick={triggerFieldInput}
          className="cursor-pointer flex-1 w-full border-[#40c9ff] hover:border-[#e81cff] rounded-[10px] flex items-center justify-center flex-col dark:border-[#1e90ff] dark:hover:border-red-500"
        >
          <svg
            className="h-[40px] dark:fill-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#000000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-white"
              ></path>
            </g>
          </svg>
        </button>
      )}
      {preview && (
        <>
          <Image
            src={preview}
            className="w-full h-[200px] object-contain"
            alt="profilePicture"
            height={50}
            width={50}
          />
          <label
            htmlFor="file"
            className="w-full h-[40px] p-2 cursor-pointer flex items-center justify-around gap-16 absolute bottom-0 dark:bg-[rgba(0,0,0,0.7)]"
          >
            <svg
              onClick={triggerFieldInput}
              fill="#000000"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[130%] fill-[royalblue] bg-[rgba(70,66,66,0.103)] rounded-full p-[2px] cursor-pointer shadow-[0_2px_30px_rgba(0,0,0,0.205)] dark:fill-[#1e90ff] dark:bg-[rgba(255,255,255,0.1)]"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
              </g>
            </svg>
            <svg
              onClick={removeImg}
              className="h-[130%] fill-[royalblue] bg-[rgba(70,66,66,0.103)] rounded-full p-[2px] cursor-pointer shadow-[0_2px_30px_rgba(0,0,0,0.205)] dark:fill-red-500 dark:bg-[rgba(255,255,255,0.1)]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                  stroke="#000000"
                  strokeWidth="2"
                  className="dark:stroke-white"
                ></path>
                <path
                  d="M19.5 5H4.5"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="dark:stroke-white"
                ></path>
                <path
                  d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                  stroke="#000000"
                  strokeWidth="2"
                  className="dark:stroke-white"
                ></path>
              </g>
            </svg>
          </label>
        </>
      )}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <input
        ref={hiddenFileInputRef}
        hidden
        type="file"
        name="image"
        onChange={handleImgChange}
        required
      />
    </div>
  );
};

export default AvatarImg;
