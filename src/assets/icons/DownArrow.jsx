const DownArrow = ({ color = "white", w = 10, h = 6, deg = 0 }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${deg}deg)`,
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <path
        d="M9 1L5 5L1 1"
        stroke={color}
        strokeWidth="1.4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrow;
