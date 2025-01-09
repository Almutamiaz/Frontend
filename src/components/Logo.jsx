import Image from "next/image";
import hakeemLogo from "@/assets/images/hakeemLogo.png";

const Logo = () => {
  return (
    <Image src={hakeemLogo} alt="Login Background" className="object-cover" />
  );
};

export default Logo;
