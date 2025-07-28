import type { LogoProps } from "@/types/components";
import LogoImage from "@assets/logo.webp";

const Logo = ({ className }: LogoProps) => {
  return (
    <img
      width={120}
      height='auto'
      src={LogoImage}
      alt='The name of the platform (Elena) with a graduation cap'
      decoding='async'
      className={className}
    />
  );
};

export default Logo;
