const ArrowIcon = ({ size = 15, deg = 0, color = "#280C69", mt = 0 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${deg}deg)`, marginTop: `${mt}px` }}
    >
      <path
        d="M1.25 14.25L13.75 1.75M13.75 1.75H2.5M13.75 1.75V13"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
