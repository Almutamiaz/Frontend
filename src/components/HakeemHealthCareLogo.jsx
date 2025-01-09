import Image from "next/image";
import hakeemLogo from "@/assets/images/hakeemHealthCareLogo.png";
const HakeemHealthCareLogo = () => {
  return (
    <Image src={hakeemLogo} alt="Hakeem Health Care Logo" className="object-cover" />
  );
};

export default HakeemHealthCareLogo;
