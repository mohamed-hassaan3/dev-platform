import Image from "next/image";
import Link from "next/link";

const LogoIcon = () => {
  return (
    <Link
      href="/feed"
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
    </Link>
  );
};
export default LogoIcon;
