import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Logo = () => {
    return (
        <Link
          href="/"
          className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
          <Image
            src={
              "https://res.cloudinary.com/dx14mtfkw/image/upload/v1742321794/dx14mtfkw/qd4rcjs4vc0jgso2ta6v.png"
            }
            alt="Logo"
            width={20}
            height={20}
          />
          <span className="ml-1 bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white">
            Home
          </span>
        </Link>
      );
}

export default Logo
